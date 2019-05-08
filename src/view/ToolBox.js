import React from "react";
import Dropzone from 'react-dropzone'
import UploadUtil from '../utils/UploadUtil'

export const ToolBox = (props) => {


    return (
        <div className="toolbox-container">
            <div className="drop-zone-container">
                <Dropzone onDrop={acceptedFiles => drawDroppedImage(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className="drop-zone" {...getRootProps()}>
                                <input  />
                                <p>Dropzone</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        </div>
    )
};

function drawDroppedImage(files) {
    let canvas  = document.getElementById("fun-canvas");
    let ctx = canvas.getContext("2d");

    let file = files[0];
    const url = URL.createObjectURL(file),
    img = new Image();


    img.onload = function() {
        URL.revokeObjectURL(this.src);
        console.log("draw");
        ctx.drawImage(this, 0, 0);
    };

    img.src = url;
    //UploadUtil.drawScaledImageOntoCanvas(image, canvas, {width:400, height:400})
}