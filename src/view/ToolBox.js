import React from "react";
import Dropzone from 'react-dropzone'
import UploadUtil from '../utils/UploadUtil'

export const ToolBox = (props) => {


    return (
        <div className="toolbox-container non-active">
            <div className="toolbox-content">
                <div className="drop-zone-container">
                    <Dropzone onDrop={acceptedFiles => drawDroppedImage(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div className="drop-zone" {...getRootProps()}>
                                    <input/>
                                    <p>Dropzone</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </div>

            <div onClick={triggerToolbox} className="toolbox-trigger">
                <span>Toolbox</span>
            </div>
        </div>
    )
};

/**
 * Drawing an image in the fun-canvas on drop
 * @param files
 */
function drawDroppedImage(files) {
    let canvas = document.getElementById("fun-canvas");
    let file = files[0];
    const url = URL.createObjectURL(file),
        img = new Image();

    img.onload = function () {
        URL.revokeObjectURL(this.src);
        UploadUtil.drawScaledImageOntoCanvas(this, canvas);
    };
    img.src = url;
}

function triggerToolbox() {

    let container = document.getElementsByClassName("toolbox-container")[0];

    if(container.classList.contains("non-active")){
        container.className = "toolbox-container active";
    }else{
        container.className = "toolbox-container non-active";
    }
}