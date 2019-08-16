import React from "react";
import gitIcon from '../assets/png/github.png';
import {SETTINGS} from "../settings/Settings";

export const Header = () => {

    return (
        <div className="header-container">

            <div className="title-container">
                <span>ComputerVision.<span>js</span></span>
            </div>

            <div className="social-container">

                <div className="social">
                    <a href={SETTINGS.links.socials.github}
                       target="_blank">
                        <img width={60}
                             height={60}
                             src={gitIcon}
                             title = "My github account"
                             alt="github icon" /></a>
                </div>
            </div>
            {/*<div className="hamburger-wrapper">*/}
                {/*<button className="hamburger" aria-label="Menu">*/}
                {/*<span className="hamburger__container">*/}
                    {/*<span className="hamburger__bars"> </span>*/}
                {/*</span>*/}
                {/*</button>*/}
            {/*</div>*/}
        </div>
    )
};
