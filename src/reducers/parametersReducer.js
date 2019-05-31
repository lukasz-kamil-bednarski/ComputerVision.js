import {SET_PARAMETERS} from "../actions/parametersAction";

export function parametersReducer(state = {linearCombinationParameter: 0.5, filterApplyNumber: 3}, action) {
    switch (action.type) {
        case SET_PARAMETERS:
            return{
                ...state,
                linearCombinationParameter: action.payload.linearCombinationParameter,
                filterApplyNumber: action.payload.filterApplyNumber
            };

        default:
            return state
    }
}