import React from "react";
import {connect} from 'react-redux';
import 'bootstrap/scss/bootstrap.scss';
// import trash from '../assets/png/trash-circle.png';
import {setMainImage} from "../actions/imageGalleryActions";
import {deleteImage} from "../actions/imageGalleryActions";
import DrawUtil from "../utils/DrawUtil";
import {EmptyGallery} from "./EmptyGallery";

class ImageGallery extends React.Component {

    renderImageGallery = (image, index) => {
        let className = "";
        if (index === this.props.mainImageIndex) {
            className += "active"
        }
        return (
            <div key={index}
                 className="single-image-container"
                 onClick={() => this.setFunCanvasImage(index)}>
                {/*<div className="delete-image-container" onClick={(e)=>this.deleteImage(e, index)}>*/}
                {/*<img width={40} height={40} src={trash}/>*/}
                {/*</div>*/}
                <img alt={'input'} className={className}
                     draggable={true}
                     onDragStart={this.onDragImage}
                     data-index={index}
                     src={image.src}/>
            </div>
        )
    };

    /**
     * Setting an image from image-gallery as a main image
     * @param index
     */
    setFunCanvasImage = (index) => {
        this.props.setMainImage(index);
        this.drawMainImage(index);

    };

    deleteImage = (e, delIndex) => {
        e.stopPropagation();
        const newImages = this.props.images.filter((value, index) => {
            return delIndex !== index
        });
        this.props.deleteImage(newImages);
    };

    /**
     * Drawing a set image onto fun-canvas
     * @param newIndex
     */
    drawMainImage = (newIndex) => {
        let img = this.props.images[newIndex];
        let canvas = document.getElementById("fun-canvas");
        DrawUtil.drawScaledImageOntoCanvas(img, canvas);
    };

    onDragImage = (event) => {
        event.persist();
        const transferData = {
            imgIndex: event.target.dataset.index
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(transferData));

    };

    render() {
        return (
            <div className="image-gallery-container non-active">
                <div onClick={triggerImageGallery} className="image-gallery-trigger">
                    <span>Gallery</span>
                </div>

                <div className="image-gallery-content">

                    <div className="image-gallery-list">
                        {this.props.images.length > 0 ?
                            this.props.images.map(this.renderImageGallery).reverse() :
                            <EmptyGallery info ="Gallery is empty"/>
                        }
                    </div>

                </div>
            </div>
        )
    }
}

/**
 * Activating or deactivating an image-gallery
 */
function triggerImageGallery() {
    let container = document.getElementsByClassName("image-gallery-container")[0];
    if (container.classList.contains("non-active")) {
        container.className = "image-gallery-container active";
    } else {
        container.className = "image-gallery-container non-active";
    }
}

const mapStateToProps = state => {

    return {
        images: state.imageGallery.images,
        mainImageIndex: state.imageGallery.mainImageIndex,
        actionID: state.toolbox.actionID
    }
};

const mapActionsToProps = {
    setMainImage: setMainImage,
    deleteImage: deleteImage
};

export default connect(mapStateToProps, mapActionsToProps)(ImageGallery);