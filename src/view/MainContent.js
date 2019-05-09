import React from 'react';

class MainContent extends React.Component {

    render(){
        return (
        <div className="main-content-container">
            <canvas ref={(canvas) => {this.canvas = canvas}}
                    width={800}
                    height={600}
                    id= "fun-canvas"
                    className="fun-canvas active">Your browser is not supporting canvas</canvas>
        </div>
        );
    }

    componentDidMount = () =>{
        //console.log(this.canvas)
    }

}

export default MainContent;
