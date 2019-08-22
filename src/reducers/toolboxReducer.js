import {SET_ACTION} from "../actions/toolboxActions";
import {ADD_IMAGE_INFO} from "../actions/toolboxActions";

export function toolboxReducer(state = {actionID: 0, imagesInfo: []}, action) {
    switch (action.type) {
        case SET_ACTION:
            return{
                ...state,
                actionID: action.payload
            };

        case ADD_IMAGE_INFO:
            return{
                ...state,
                imagesInfo: [...state.imagesInfo, action.payload]
            };

        default:
            return state
    }
}