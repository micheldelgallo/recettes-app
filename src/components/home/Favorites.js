import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Image, Button, Tab, Card, Message, Icon } from 'semantic-ui-react';

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let { favorites , favoritesRemove, handleOpen } = this.props;

        const getHostnameFromRegex = (url) => {
            const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            return matches && matches[1];
        }

        return (
            <Tab.Pane attached={false} >

                    <Container>
                        {(favorites.length == 0 ? <Message>
                            <Message.Header>Recettes Préférés</Message.Header>
                            <p>
                            Nous pouvons sauvegarder toutes les recettes préférés lorsque vous cliquez sur l'icône <Icon name="heart" color="red" />
                            </p>
                        </Message> : "")}

                        <Card.Group doubling itemsPerRow={4} stackable>

                            {favorites.map(item => (
                                <Card key={`fav${item.id}`}>
                                    <Image src={item.image} />
                                    <Card.Content>
                                        <Card.Header>{item.title}</Card.Header>
                                        <Card.Meta>Ready in {item.readyInMinutes} minutes for {item.servings} people</Card.Meta>
                                        <Card.Description>By {getHostnameFromRegex(item.sourceUrl)}</Card.Description>
                                    </Card.Content>

                                    <Card.Content extra>
                                        <Button disabled={false} primary onClick={() => handleOpen(item)}>
                                            Voir
                                            </Button>
                                        <Button disabled={false}
                                            color='red' icon='remove'
                                            onClick={() => favoritesRemove(item.id)}
                                        ></Button>
                                    </Card.Content>
                                </Card>
                            ))}

                        </Card.Group>
                    </Container>

                </Tab.Pane>
        )
    }
}

Favorites.defaultProps = {
    favorites: []
};

Favorites.propTypes = {
    favorites: PropTypes.array.isRequired
    , favoritesRemove: PropTypes.func.isRequired
    , handleOpen: PropTypes.func.isRequired
};

export default Favorites


