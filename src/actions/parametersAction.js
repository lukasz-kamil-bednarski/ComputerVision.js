export const SET_PARAMETERS = "parameters:set";

export function setParameters(parameters){
    return {
        type:SET_PARAMETERS,
        payload:parameters
    }
}