import {SET_ACTION} from "../actions/toolboxActions";

export function toolboxReducer(state = {actionID: 0}, action) {
    switch (action.type) {
        case SET_ACTION:
            return{
                ...state,
                actionID: action.payload
            };

        default:
            return state
    }
}