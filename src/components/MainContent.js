import React from 'react';
import ActionManager from '../logic/manager/Manager';
import {connect} from 'react-redux';
import DrawUtil from '../utils/DrawUtil';
import downloadIcon from '../assets/png/download.png';
import rightArrowIcon from '../assets/png/right-arrow.png';
import {addNewImage} from "../actions/imageGalleryActions";
import getCanvasSize from "../utils/CanvasSizeUtli";
import CanvasUtil from '../utils/CanvasUtil';

class MainContent extends React.Component {


    state = {
        mousePosition: {}
    };

    constructor(props){
        super(props);
        this.canvasSize = getCanvasSize();
        this.canvasUtil = new CanvasUtil();
    }

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

    trackCursor = (e) => {
     let mousePosition = this.canvasUtil.getMousePos(this.canvas, e);
     this.setState({
        mousePosition: mousePosition
     });

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
                            onMouseMove={this.trackCursor}
                            width={this.canvasSize.width}
                            height={this.canvasSize.height}
                            id="fun-canvas"
                            className="fun-canvas active">Your browser is not supporting canvas
                    </canvas>
                </div>
                <div className="side-info-container">
                    <span>{this.state.mousePosition.x}</span>
                    <span>{this.state.mousePosition.y}</span>
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
