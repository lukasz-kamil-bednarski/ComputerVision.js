import {ADD_NEW_IMAGE} from "../actions/imageGalleryActions";
import {SET_MAIN_IMAGE} from "../actions/imageGalleryActions";

export function imageGalleryReducer(state = {images:[], mainImageIndex:0}, action) {
    switch (action.type) {
        case ADD_NEW_IMAGE:
            return{
                ...state,
                images:[...state.images, action.payload]
            };

        case SET_MAIN_IMAGE:
            console.log("CHANGE SET");
            console.log("action payload");
            console.log(action.payload);
            return{
                ...state,
                mainImageIndex: action.payload
            };
        default:
            return state
    }
}