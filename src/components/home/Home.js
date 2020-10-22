import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Label, Icon, Tab, Menu } from 'semantic-ui-react';

import HeaderSearch from './HeaderSearch';
import Recipes from './Recipes';
import Favorites from './Favorites';
import Details from './Details';

import { recipesList, recipesOpen, recipesSearchChange, recipesSearch } from '../../actions/RecipesActions';
import { favoritesAdd, favoritesRemove } from '../../actions/FavoritesActions';

class Home extends Component {

    state = { tabindex: 0 }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.recipesList()
    }

    handleOpen = (item) => {
        this.setState({ tabindex: 2 })
        this.props.recipesOpen(item);
    }

    handleSearch = () => {
        if (!this.props.issearching && (this.props.RecipesSearchEntity.searchexpression != '' || this.props.RecipesSearchEntity.diets != '')) {
            this.props.recipesSearch(this.props.RecipesSearchEntity).then(d => {
                this.setState({ tabindex: 0 });
            })
        }
    }

    handleDiet = (e, { value }) => {
        this.props.recipesSearchChange({ target: { 'name': 'diets', 'value': value.toString() } });
    }

    handleTabChange = (e, { activeIndex }) => {
        if(activeIndex=='2'){
            if(this.props.details.length>0){
                this.setState({ tabindex: activeIndex });    
            }
        }else{
            this.setState({ tabindex: activeIndex });
        }
    }

    render() {

        let { search, issearching, issearchingrandon, favorites, details, isdetailing
            , favoritesAdd, favoritesRemove, recipesSearchChange
        } = this.props;

        const panes = [
            {
                menuItem: <Menu.Item key='TAB1'><Icon name='list layout' />Recettes<Label color='blue'>{search.length}</Label></Menu.Item>,
                render: () => <Recipes search={search} favorites={favorites} loader={issearchingrandon} favoritesAdd={favoritesAdd} handleOpen={this.handleOpen} />,
            },

            {
                menuItem: <Menu.Item key='TAB2'><Icon name='like' />Préférés<Label color='red'>{favorites.length}</Label></Menu.Item>,
                render: () => <Favorites favorites={favorites} favoritesRemove={favoritesRemove} handleOpen={this.handleOpen} />,
            },

            {
                menuItem: <Menu.Item key='TAB3'><Icon name='eye' /></Menu.Item>,
                render: () => <Details details={details} loader={isdetailing} favoritesAdd={favoritesAdd} handleOpen={this.handleOpen} favorites={favorites} />,
            }
        ]

        return (
            <div>
                <HeaderSearch recipesSearchChange={recipesSearchChange} handleDiet={this.handleDiet} handleSearch={this.handleSearch} issearching={issearching} />

                <Container>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes}
                        activeIndex={this.state.tabindex}
                        onTabChange={this.handleTabChange}
                    />
                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => (
    {
        search: state.RecipesReducer.search
        , issearching: state.RecipesReducer.issearching
        , issearchingrandon: state.RecipesReducer.issearchingrandon
        , favorites: state.FavoritesReducer.favorites
        , details: state.RecipesReducer.details
        , isdetailing: state.RecipesReducer.isdetailing
        , RecipesSearchEntity: state.RecipesReducer.RecipesSearchEntity
    }
);

export default withRouter(connect(mapStateToProps, {
    recipesList
    , recipesOpen
    , recipesSearchChange
    , recipesSearch
    , favoritesAdd
    , favoritesRemove
}
)(Home));
