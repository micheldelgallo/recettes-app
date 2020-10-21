import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import { Container, Tab, Image, Header, Label, Button, Card, List } from 'semantic-ui-react';

class Details extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let { details, loader
            , favoritesAdd, handleOpen, favorites
        } = this.props;

        const getHostnameFromRegex = (url) => {
            const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            return matches && matches[1];
        }

        return (
            <Tab.Pane attached={false} loading={loader} >
                {(details.length > 0 ? (
                    <div>
                        <Container>
                            <Header as='h2'>
                                {details[0].informations.title}
                                <Header.Subheader>
                                    {details[0].informations.creditsText}
                                </Header.Subheader>
                            </Header>

                            {parse((details[0].informations.instructions != null ? details[0].informations.instructions : ''))}

                            <Image src={`https://spoonacular.com/recipeImages/${details[0].informations.id}-556x370.jpg`} size='big' centered bordered />


                        </Container>

                        <Container>
                            <br></br>
                            <Header as='h3' dividing>
                                Ingrédients
                            </Header>
                            <Card.Group doubling itemsPerRow={4} stackable>
                                {details[0].informations.extendedIngredients.map(item => (
                                    <Card key={`ingr${item.id}`}>
                                        <Card.Content>
                                            <Image
                                                floated='right'
                                                size='tiny'
                                                src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                                            />
                                            <Card.Header>{item.name}</Card.Header>
                                            <Card.Meta>{item.original}</Card.Meta>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Label>{item.amount} {item.unit}</Label>
                                        </Card.Content>
                                    </Card>
                                ))}
                            </Card.Group>
                        </Container>


                        {(details[0].informations.analyzedInstructions.length > 0 ? (
                            <Container>
                                <br></br>
                                <Header as='h3' dividing>
                                    Instructions
                            </Header>

                                <List ordered>
                                    {details[0].informations.analyzedInstructions[0].steps.map(item => (
                                        <List.Item key={`step${item.number}`}>{item.step}</List.Item>
                                    ))}
                                </List>

                                <Label as='a' tag>
                                    Ready in {details[0].informations.readyInMinutes} minutes for {details[0].informations.servings} people
                            </Label>

                            </Container>
                        ) : "")}

                        <Container>
                            <br></br>
                            <Header as='h3' dividing>
                                Recettes similaires
                            </Header>
                            <Card.Group doubling itemsPerRow={5} stackable>

                                {details[0].similar.map(item => (
                                    <Card key={`similar${item.id}`}>
                                        <Image src={item.image} />
                                        <Card.Content>
                                            <Card.Header>{item.title}</Card.Header>
                                            <Card.Meta>Ready in {item.readyInMinutes} minutes for {item.servings} people</Card.Meta>
                                            <Card.Description>{getHostnameFromRegex(item.sourceUrl)}</Card.Description>
                                        </Card.Content>

                                        <Card.Content extra>
                                            <Button disabled={false} primary onClick={() => handleOpen(item)}>
                                                Voir
                                    </Button>
                                            <Button disabled={false}
                                                color='red' icon='heart' disabled={(favorites.includes(item) ? true : false)}
                                                onClick={() => favoritesAdd(item)}
                                            ></Button>
                                        </Card.Content>
                                    </Card>
                                ))}

                            </Card.Group>
                        </Container>
                    </div>
                ) : "")}

            </Tab.Pane>
        )
    }
}

Details.defaultProps = {
    details: []
    , favorites: []
    , loader: true
};

Details.propTypes = {
    details: PropTypes.array.isRequired
    , favorites: PropTypes.array.isRequired
    , loader: PropTypes.bool.isRequired
    , favoritesAdd: PropTypes.func.isRequired
    , handleOpen: PropTypes.func.isRequired
};

export default Details


