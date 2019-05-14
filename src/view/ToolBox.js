import React from "react";
import Dropzone from 'react-dropzone'
import UploadUtil from '../utils/UploadUtil'
import {addNewImage} from "../actions/imageGalleryActions";
import {connect} from 'react-redux';
import {Settings} from "../settings/Settings";
import dropLogo from "../assets/png/dropzone.png"

class ToolBox extends React.Component {

    addNewImage = (img) => {
        this.props.addNewImage(img);
    };

    /**
     * Drawing an image in the fun-canvas on drop
     * @param files
     */
    drawDroppedImage = (files) => {

        let canvas = document.getElementById("fun-canvas");
        for (let file of files) {
            const url = URL.createObjectURL(file);
            const img = new Image();

            img.onload = () => {
                URL.revokeObjectURL(img.src);
                UploadUtil.drawScaledImageOntoCanvas(img, canvas);
            };
            img.src = url;
            this.addNewImage(img);
        }

    };

    dragAlgorithm = (event) =>{
        event.dataTransfer.setData("text/plain", event.target.id);
    };

    render() {

        const algorithms = Settings.algorithms;

        return (
            <div className="toolbox-container non-active">
                <div className="toolbox-content">
                    <div className="drop-zone-container">
                        <Dropzone onDrop={acceptedFiles => this.drawDroppedImage(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div className="drop-zone" {...getRootProps()}>
                                        <input/>
                                        <img src={dropLogo} alt="drop-logo"/>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>

                    <div className="algorithms-container">
                        {algorithms.map((category) => {

                            return (category.map((concreteAlgorithm) => {
                                return (
                                    <div id={concreteAlgorithm.id}
                                         key={concreteAlgorithm.id}
                                         title={concreteAlgorithm.name}
                                         className="single-algorithm-container"
                                         draggable={true}
                                         onDragStart={this.dragAlgorithm}>
                                        <span>{concreteAlgorithm.name.toUpperCase()}</span>
                                    </div>
                                )
                            }))
                        })}

                    </div>

                    {/*<div onDragStart={this.choose} style={{background:'red'}} draggable={true}>Test drag</div>*/}

                    {/*<div id="target"onDrop={this.consume} style={{marginTop:'100px'}}>Drop Zone</div>*/}
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
    if (container.classList.contains("non-active")) {
        container.className = "toolbox-container active";
    } else {
        container.className = "toolbox-container non-active";
    }
}


const mapStateToProps = state => {

    return {
        imageGallery: state.imageGallery
    }

};
const mapActionsToProps = {
    addNewImage: addNewImage
};

export default connect(mapStateToProps, mapActionsToProps)(ToolBox);