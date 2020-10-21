import {
    RECIPES_LIST_SEARCH
    , RECIPES_ISSEARCHING
    , RECIPES_CHANGE_SEARCH
    , RECIPES_ISSEARCHING_RANDON
    , RECIPES_ISDETAILING
    , RECIPES_LIST_DETAILS
    , RECIPES_CLEAR_DETAILS
} from '../actions/ActionsTypes';

import { RecipesSearchEntity } from '../entities/RecipesSearchEntity';

const INITIAL_STATE = {
    search: []
    , issearching: false
    , favorites: []
    , details: []
    , isdetailing: false
    , issearchingrandon: true
    , RecipesSearchEntity
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case RECIPES_LIST_SEARCH:
            return { ...state, search: action.payload }
        case RECIPES_ISSEARCHING:
            return { ...state, issearching: action.payload }
        case RECIPES_ISSEARCHING_RANDON:
            return { ...state, issearchingrandon: action.payload }
        case RECIPES_CHANGE_SEARCH:
            return { ...state, RecipesSearchEntity: { ...state.RecipesSearchEntity, [action.field]: action.payload } }
        case RECIPES_LIST_DETAILS:
            return { ...state, details: action.payload }
        case RECIPES_ISDETAILING:
            return { ...state, isdetailing: action.payload }
        case RECIPES_CLEAR_DETAILS:
                return { ...state, details: [] }
        default:
            return state;
    }
}