import React from 'react';


class MainContent extends React.Component {

    render(){
        return (
        <div className="main-content-container">
            <canvas style={{background:'red'}} width={400} height={400} className="fun-canvas active"> </canvas>
        </div>
        );
    }

}

export default MainContent;
