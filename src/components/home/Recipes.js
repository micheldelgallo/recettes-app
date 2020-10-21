import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Image, Button, Tab, Card, Message } from 'semantic-ui-react';

class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let { search, favorites, loader
            , favoritesAdd, handleOpen
        } = this.props;

        const getHostnameFromRegex = (url) => {
            const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            return matches && matches[1];
        }

        return (
            <Tab.Pane attached={false} loading={loader}>
                <Container>
                    {(search.length == 0 ?
                        <Message
                            icon='smile'
                            header='Désolé'
                            content='Vous méritez tellement plus qu’une recherche sans résultat !'
                        /> : "")}
                    <Card.Group doubling itemsPerRow={3} stackable>
                        {search.map(item => (
                            <Card key={`recipes${item.id}`}>
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
                                    <Button
                                        disabled={(favorites.includes(item) ? true : false)}
                                        color='red' icon='heart'
                                        onClick={() => favoritesAdd(item)}
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

Recipes.defaultProps = {
    search: []
    , favorites: []
    , loader: true
};

Recipes.propTypes = {
    search: PropTypes.array.isRequired
    , favorites: PropTypes.array.isRequired
    , loader: PropTypes.bool.isRequired
    , favoritesAdd: PropTypes.func.isRequired
    , handleOpen: PropTypes.func.isRequired
};

export default Recipes


