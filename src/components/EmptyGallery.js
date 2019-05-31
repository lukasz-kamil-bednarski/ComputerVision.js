import React from "react";
import emptyIcon from '../assets/png/empty.png';

export const EmptyGallery = (props) => {

    return (
        <div className="empty-info-container">

            <div className="empty-info">
                <span>{props.info}</span>
                <img src={emptyIcon} alt = "your gallery is empty"/>
            </div>
        </div>
    )
};