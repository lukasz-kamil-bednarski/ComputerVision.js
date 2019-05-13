import React from 'react';

class MainContent extends React.Component {

    consumeAlgorithm = (event) =>{
        console.log("consuming");
    };
    render(){
        return (
        <div className="main-content-container">
            <canvas ref={(canvas) => {this.canvas = canvas}}
                    onDrop={this.consumeAlgorithm}
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
