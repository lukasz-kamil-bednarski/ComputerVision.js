import React from "react";
import Dropzone from 'react-dropzone'
import DrawUtil from '../utils/DrawUtil'
import {addNewImage} from "../actions/imageGalleryActions";
import {setAction} from "../actions/toolboxActions";
import {connect} from 'react-redux';
import {SETTINGS} from "../settings/Settings";
import dropLogo from "../assets/png/dropzone.png"
import {findActionNameById} from "../settings/Settings";

class ToolBox extends React.Component {


    state = {
        currentActionId:0,
        currentActionName: 'None'
    };

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
                DrawUtil.drawScaledImageOntoCanvas(img, canvas);
            };
            img.src = url;
            this.addNewImage(img);
        }

    };

    /**
     * Function calling on dragging an element from toolbox list
     * @param event
     */
    dragAction = (event) =>{

        let transferData = {
            actionID: event.target.id
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(transferData));
    };

    onSetAction = (event) =>{

        if(!event.target.draggable){
            this.props.setAction(event.target.id);
            const newActionName = findActionNameById(event.target.id);
            this.setState({
                currentActionId: event.target.id,
                currentActionName: newActionName
            });
        }
    };

    /**
     * Method handling file input by picking a file from a directory
     * @param event
     */
    handleFileInput = (event) =>{
        let files = event.target.files;
        this.drawDroppedImage(files);
    };

    render() {

        const algorithms = SETTINGS.algorithms;

        return (
            <div className="toolbox-container non-active">
                <div className="toolbox-content">
                    <div className="input-file-container">
                        <label htmlFor="file-picker">Choose a file</label>
                        <input onChange={this.handleFileInput} id="file-picker" style={{display:'none'}} type="file"/>
                    </div>
                    <div className="drop-zone-container">
                        <Dropzone onDrop={acceptedFiles => this.drawDroppedImage(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div className="drop-zone" {...getRootProps()}>
                                        <input />
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
                                         draggable={concreteAlgorithm.argumentNumber === 1}
                                         onClick = {this.onSetAction}
                                         onDragStart={this.dragAction}>
                                        {concreteAlgorithm.name.toUpperCase()}
                                    </div>
                                )
                            }))
                        })}

                    </div>
                </div>

                <div className="additional-container">
                    <div onClick={triggerToolbox} className="toolbox-trigger">
                        <span>Toolbox</span>
                    </div>
                    <div className="info-container">
                        <span>{this.state.currentActionName.toUpperCase()}</span>
                    </div>
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
        imageGallery: state.imageGallery,
        toolbox: state.toolbox
    }

};
const mapActionsToProps = {
    addNewImage: addNewImage,
    setAction: setAction

};

export default connect(mapStateToProps, mapActionsToProps)(ToolBox);