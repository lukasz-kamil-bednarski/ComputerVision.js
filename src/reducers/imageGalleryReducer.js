import {ADD_NEW_IMAGE} from "../actions/imageGalleryActions";

export function imageGalleryReducer(state = ['TEST'], action) {
    switch (action.type) {
        case ADD_NEW_IMAGE:
            console.log("works");
            return action.payload;
        default:
            console.log("XD");
            return state
    }
}