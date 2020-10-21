import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Segment, Button, Form, Dropdown, Icon, Header } from 'semantic-ui-react';

class HeaderSearch extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let { recipesSearchChange , issearching, handleDiet, handleSearch } = this.props;

        const options = [
            { key: 'gluten free', text: 'Gluten Free', value: 'gluten free' },
            { key: 'ketogenic', text: 'Ketogenic', value: 'ketogenic' },
            { key: 'vegetarian', text: 'Vegetarian', value: 'vegetarian' },
            { key: 'lacto vegetarian', text: 'Lacto-Vegetarian', value: 'lacto vegetarian' },
            { key: 'ovo vegetarian', text: 'Ovo-Vegetarian', value: 'ovo vegetarian' },
            { key: 'vegan', text: 'Vegan', value: 'vegan' },
            { key: 'pescetarian', text: 'Pescetarian', value: 'pescetarian' },
            { key: 'paleo', text: 'Paleo', value: 'paleo' },
            { key: 'primal', text: 'Primal', value: 'primal' },

        ]

        return (
        <div>
            <Container>
                    <Header as='h2'>
                        <Icon name='food' />
                        <Header.Content>
                            Recettes APP
                        <Header.Subheader>By Michel Legendre Delgallo</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Container>

                <Container>
                    <Segment>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Rechercher' placeholder='Ex pasta'
                                    name="searchexpression"
                                    onChange={recipesSearchChange}
                                    icon='search'
                                    iconPosition='left'
                                />
                                <Form.Field
                                    control={Dropdown}
                                    name='diets'
                                    onChange={handleDiet}
                                    label='Diet'
                                    placeholder='Ex vegetarian'
                                    fluid multiple selection options={options}
                                />
                            </Form.Group>
                            <Button type='submit' loading={issearching} onClick={() => handleSearch()}>Rechercher</Button>
                        </Form>
                    </Segment>

                </Container>
                </div>
        )
    }
}

HeaderSearch.defaultProps = {
    issearching: false
};

HeaderSearch.propTypes = {
    recipesSearchChange: PropTypes.func.isRequired
    , handleDiet: PropTypes.func.isRequired
    , handleSearch: PropTypes.func.isRequired
    , issearching: PropTypes.bool.isRequired
};

export default HeaderSearch


