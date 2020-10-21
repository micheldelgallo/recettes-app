import {
    FAVORITES_ADD
    , FAVORITES_REMOVE
} from '../actions/ActionsTypes';

export const favoritesAdd = (item)=> (dispatch)=>{
    new Promise(function (resolve,reject){
        dispatch({type:FAVORITES_ADD, payload:item })
        resolve(item)
    })
}

export const favoritesRemove = (id)=> (dispatch)=>{
    new Promise(function (resolve,reject){
        dispatch({type:FAVORITES_REMOVE, payload:id })
        resolve(id)
    })
}