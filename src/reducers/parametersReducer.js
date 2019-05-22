import {SET_PARAMETERS} from "../actions/parametersAction";

export function parametersReducer(state = {linearCombinationParameter: 0.5}, action) {
    switch (action.type) {
        case SET_PARAMETERS:
            return{
                ...state,
                actionID: action.payload
            };

        default:
            return state
    }
}