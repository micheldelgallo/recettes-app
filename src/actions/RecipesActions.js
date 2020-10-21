import {
    RECIPES_LIST_SEARCH
    , RECIPES_ISSEARCHING
    , RECIPES_ISSEARCHING_RANDON
    , RECIPES_CHANGE_SEARCH
    , RECIPES_ISDETAILING
    , RECIPES_LIST_DETAILS
    , RECIPES_CLEAR_DETAILS
} from '../actions/ActionsTypes';

import * as Api from '../utils/API';

export const recipesSearchChange = (event) => {
    return {
        type: RECIPES_CHANGE_SEARCH
        , field: event.target.name
        , payload: event.target.value
    }
}

export const recipesSearch = (entity) => (dispatch) =>
    new Promise(function (resolve, reject) {
        dispatch({ type: RECIPES_ISSEARCHING, payload: true })

        Api.getRecipesSearch(entity).then(dados => {
            dispatch({ type: RECIPES_LIST_SEARCH, payload: dados })
            dispatch({ type: RECIPES_ISSEARCHING, payload: false })
            resolve({})
        }).catch(error => {
            dispatch({ type: RECIPES_ISSEARCHING, payload: false })
            reject(error);
        })
    })

export const recipesList = () => (dispatch) =>
    new Promise(function (resolve, reject) {
        dispatch({ type: RECIPES_ISSEARCHING_RANDON, payload: true })

        Api.getRecipesRandom().then(dados => {
            dispatch({ type: RECIPES_LIST_SEARCH, payload: dados })
            dispatch({ type: RECIPES_ISSEARCHING_RANDON, payload: false })
            resolve([])
        }).catch(error => {
            dispatch({ type: RECIPES_ISSEARCHING_RANDON, payload: false })
            reject(error);
        })
    })

export const recipesOpen = (item) => (dispatch) =>
    new Promise(function (resolve, reject) {
        dispatch({ type: RECIPES_CLEAR_DETAILS, payload: true })
        dispatch({ type: RECIPES_ISDETAILING, payload: true })

        Api.getRecipesDetails(item.id).then(dados => {
            dispatch({ type: RECIPES_LIST_DETAILS, payload: dados })
            dispatch({ type: RECIPES_ISDETAILING, payload: false })
            resolve({})
        }).catch(error => {
            dispatch({ type: RECIPES_ISDETAILING, payload: false })
            reject(error);
        })
    })



