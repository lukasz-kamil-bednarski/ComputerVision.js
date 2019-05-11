import {ADD_NEW_IMAGE} from "../actions/imageGalleryActions";
import {SET_MAIN_IMAGE} from "../actions/imageGalleryActions";

export function imageGalleryReducer(state = {images:[], mainImageIndex:0}, action) {
    switch (action.type) {
        case ADD_NEW_IMAGE:
            return{
                ...state,
                images:[...state.images, action.payload],
                mainImageIndex: state.images.length
            };

        case SET_MAIN_IMAGE:
            return{
                ...state,
                mainImageIndex: action.payload
            };
        default:
            return state
    }
}