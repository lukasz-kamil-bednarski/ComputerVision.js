import {SET_PARAMETERS} from "../actions/parametersAction";

export function parametersReducer(state = {linearCombinationParameter: 0.5,
    filterApplyNumber: 1, kernel:[[0,0,0], [0,1,0],[0,0,0]], binarizationThreshold: 100},
                                  action) {
    switch (action.type) {
        case SET_PARAMETERS:
            return{
                ...state,
                linearCombinationParameter: action.payload.linearCombinationParameter,
                filterApplyNumber: action.payload.filterApplyNumber,
                kernel : action.payload.kernel,
                binarizationThreshold: action.payload.binarizationThreshold
            };

        default:
            return state
    }
}