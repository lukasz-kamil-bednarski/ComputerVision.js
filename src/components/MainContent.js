import React from 'react';
import ActionManager from '../logic/manager/Manager';
import {connect} from 'react-redux';
import DrawUtil from '../utils/DrawUtil';
import downloadIcon from '../assets/png/download.png';
import rightArrowIcon from '../assets/png/right-arrow.png';
import {addNewImage} from "../actions/imageGalleryActions";

class MainContent extends React.Component {

    consumeAction = (event) => {
        event.preventDefault();
        let transferData = JSON.parse(event.dataTransfer.getData("text"));

        if (transferData.actionID) {
            ActionManager.executeAction(transferData.actionID);
        }

        if (transferData.imgIndex) {
            const transferImage = this.props.images[parseInt(transferData.imgIndex)];
            let testCanvas = document.createElement("canvas");
            let imgData = DrawUtil.drawScaledImageOntoCanvas(transferImage, testCanvas).data;
            ActionManager.executeAction(this.props.actionID, imgData);
        }
        event.dataTransfer.clearData();
    };

    /**
     * Method allowing to download a current image from the canvas to the disc
     */
    downloadImage = () => {
        let download = document.createElement("a");
        let image = document.getElementById("fun-canvas").toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
        download.setAttribute("download", "image.png");
        download.click();
    };

    /**
     * Method moving(adding) a current image on the fun-canvas to image-gallery
     */
    moveToGallery = () => {
        let dataUrl = this.canvas.toDataURL();
        let image = document.createElement('img');
        image.src = dataUrl;
        this.props.addNewImage(image);

    };

    render() {
        return (
            <div className="main-content-container">
                <div className="fun-canvas-container">

                    <div className="main-canvas-action-box">
                        <div className="single-action-box">
                            <img alt="download-icon"
                                 src={downloadIcon}
                                 onClick={this.downloadImage}
                                 title="download icon"/>
                        </div>

                        <div className="single-action-box">
                            <img alt="download-icon"
                                 onClick={this.moveToGallery}
                                 src={rightArrowIcon}
                                 title="move to gallery"/>
                        </div>

                    </div>

                    <canvas ref={(canvas) => {
                        this.canvas = canvas
                    }}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={this.consumeAction}
                            width={800}
                            height={600}
                            id="fun-canvas"
                            className="fun-canvas active">Your browser is not supporting canvas
                    </canvas>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.canvas.addEventListener("resize", function(){
        }, false)
    }

}

const mapStateToProps = (state) => {
    return {
        images: state.imageGallery.images,
        actionID: state.toolbox.actionID
    }
};

const mapActionsToProps = {

    addNewImage: addNewImage
};

export default connect(mapStateToProps, mapActionsToProps)(MainContent);
