import React from "react";
import Dropzone from "react-dropzone";


export const ImageGallery = (props) => {

    return (
        <div className="image-gallery-container non-active">
            <div onClick={triggerImageGallery} className="image-gallery-trigger">
                <span>Gallery</span>
            </div>

            <div className="image-gallery-content">
            </div>
        </div>
    )
};

/**
 * Activating or deactivating an image-gallery
 */
function triggerImageGallery() {
    let container = document.getElementsByClassName("image-gallery-container")[0];
    if(container.classList.contains("non-active")){
        container.className = "image-gallery-container active";
    }else{
        container.className = "image-gallery-container non-active";
    }
}