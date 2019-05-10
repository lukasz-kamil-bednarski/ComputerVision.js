import React from "react";
import Dropzone from 'react-dropzone'
import UploadUtil from '../utils/UploadUtil'
import {addNewImage} from "../actions/imageGalleryActions";
import {connect} from 'react-redux';

class ToolBox extends React.Component{

    addNewImage = (img) =>{
      this.props.addNewImage(img);
    };

    /**
     * Drawing an image in the fun-canvas on drop
     * @param files
     */
    drawDroppedImage = (files) => {

        let canvas = document.getElementById("fun-canvas");
        let file = files[0];
        const url = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(img.src);
            let obj = UploadUtil.drawScaledImageOntoCanvas(img, canvas);
            this.addNewImage(obj.data);

        };
        img.src = url;
    };

    render(){
        console.log(this.props.imageGallery);
        return (
            <div className="toolbox-container non-active">
                <div className="toolbox-content">
                    <div className="drop-zone-container">
                        <Dropzone onDrop={acceptedFiles => this.drawDroppedImage(acceptedFiles)}>
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
    }
}

/**
 * Activating or deactivating a toolbox
 */
function triggerToolbox() {
    let container = document.getElementsByClassName("toolbox-container")[0];
    if(container.classList.contains("non-active")){
        container.className = "toolbox-container active";
    }else{
        container.className = "toolbox-container non-active";
    }
}


const mapStateToProps = state => {

    return{
        imageGallery: state.imageGallery
    }

};
const mapActionsToProps = {
    addNewImage: addNewImage
};

export default connect(mapStateToProps, mapActionsToProps)(ToolBox);