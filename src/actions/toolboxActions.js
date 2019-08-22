export const SET_ACTION = "toolbox:set";
export const ADD_IMAGE_INFO = "toolbox: add-info";

export function setAction(actionID){
    return {
        type:SET_ACTION,
        payload:actionID
    }
}

export function addImageInfo(actionID){
    return {
        type:ADD_IMAGE_INFO,
        payload:actionID
    }
}