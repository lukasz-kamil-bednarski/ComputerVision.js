import React from 'react';
import ActionManager from '../logic/manager/Manager';
import {connect} from 'react-redux';
import DrawUtil from '../utils/DrawUtil';
import downloadIcon from '../assets/png/download.png';
import rightArrowIcon from '../assets/png/right-arrow.png';

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

    render() {
        return (
            <div className="main-content-container">
                <div className="fun-canvas-container">

                    <div className="main-canvas-action-box">
                        <div className="single-action-box">
                            <img alt="download-icon"
                                 src={downloadIcon}
                                 title = "download icon"/>
                        </div>

                        <div className="single-action-box">
                            <img alt="download-icon"
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

}

const mapStateToProps = (state) => {
    return {
        images: state.imageGallery.images,
        actionID: state.toolbox.actionID
    }
};

export default connect(mapStateToProps)(MainContent);
