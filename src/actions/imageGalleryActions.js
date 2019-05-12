export const ADD_NEW_IMAGE = "image-gallery:add";
export const SET_MAIN_IMAGE = "image-gallery:set";
export const DELETE_IMAGE = "image-gallery:delete";

export function addNewImage(newImage){
    return {
        type: ADD_NEW_IMAGE,
        payload: newImage
        }
    }

export function setMainImage(index) {
    return {
        type: SET_MAIN_IMAGE,
        payload: index
    }
}

export function deleteImage(images) {
    return {
        type: DELETE_IMAGE,
        payload: images
    }
}