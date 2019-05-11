import React from "react";
import {connect} from 'react-redux';
import 'bootstrap/scss/bootstrap.scss';
import trash from '../assets/png/trash-circle.png';
import {setMainImage} from "../actions/imageGalleryActions";

class ImageGallery extends React.Component {

    renderImageGallery = (image, index) => {
        return (
            <div key={index} className="single-image-container" onClick={this.setFunCanvasImage}>
                <div className="delete-image-container" >
                  <img width={40} height={40} src={trash} />
                </div>
                <img src={image.src}/>
            </div>
        )
    };

    setFunCanvasImage = () =>{
        console.log("Xd");
        setMainImage(3);
    };

    render() {
        return (
            <div className="image-gallery-container non-active">
                <div onClick={triggerImageGallery} className="image-gallery-trigger">
                    <span>Gallery</span>
                </div>

                <div className="image-gallery-content">
                    <div className="image-gallery-list">
                        {this.props.images.map(this.renderImageGallery)}
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
        mainImageIndex: state.imageGallery.mainImageIndex
    }
};

const mapActionsToProps = {
    setMainImage: setMainImage
};

export default connect(mapStateToProps, mapActionsToProps)(ImageGallery);