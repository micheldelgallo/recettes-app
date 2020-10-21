import {
    FAVORITES_ADD
    , FAVORITES_REMOVE
} from '../actions/ActionsTypes';

const INITIAL_STATE = {
    favorites: []
}

const itemExists = (items, item) => {
    return items.find((e) => e.id === item.id);
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FAVORITES_ADD:
            if (itemExists(state.favorites, action.payload)) {
                return { ...state }
            } else {
                return { ...state, favorites: state.favorites.concat(action.payload) }
            }

        case FAVORITES_REMOVE:
            return { ...state, favorites: [...state.favorites.filter(i => action.payload !== i.id)] }

        default:
            return state;
    }
}