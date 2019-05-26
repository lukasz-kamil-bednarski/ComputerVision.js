import React from "react";

export const Header = (props) => {

    return (
        <div className="header-container">

            <div className="title-container">
                <span>ComputerVision.<span>js</span></span>
            </div>

            <div className="hamburger-wrapper">
                <button className="hamburger" aria-label="Menu">
                <span className="hamburger__container">
                    <span className="hamburger__bars"> </span>
                </span>
                </button>
            </div>
        </div>
    )
};
