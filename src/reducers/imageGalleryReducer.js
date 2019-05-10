import {ADD_NEW_IMAGE} from "../actions/imageGalleryActions";

export function imageGalleryReducer(state = [], action) {
    switch (action.type) {
        case ADD_NEW_IMAGE:
            return [...state, action.payload];
        default:
            return state
    }
}