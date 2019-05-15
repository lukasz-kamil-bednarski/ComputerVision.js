export const SET_ACTION = "toolbox:set";

export function setAction(actionID){
    return {
        type:SET_ACTION,
        payload:actionID
    }
}