import React from 'react';
import ActionManager from '../logic/manager/Manager';

class MainContent extends React.Component {

    consumeAction = (event) =>{
        event.preventDefault();

        let algorithmID = event.dataTransfer.getData("text");
        ActionManager.executeAction(algorithmID, this.canvas);
        event.dataTransfer.clearData();
    };

    render(){
        return (
        <div className="main-content-container">
            <canvas ref={(canvas) => {this.canvas = canvas}}
                    onDragOver={(event)=> event.preventDefault()}
                    onDrop={this.consumeAction}
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
