export const ADD_NEW_IMAGE = "image-gallery:add";

export function addNewImage(newImage){
    return {
        type: ADD_NEW_IMAGE,
        payload: newImage


        }
    }