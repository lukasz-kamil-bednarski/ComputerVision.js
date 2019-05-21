import React from "react";
import {SETTINGS} from '../settings/Settings';

class ParametersBox extends React.Component{


    toggleParametersBox = (e) =>{
        e.persist();
        console.log([2,3,].includes(2));
        if(e.target.parentNode.parentNode.classList.contains('active')){
            e.target.parentNode.parentNode.classList.remove('active')
        }else{
            e.target.parentNode.parentNode.classList.add('active')
        }

    };

    render(){
        return (
            <div className="parameters-container">

                <div className="parameters-header-container">
                    <div onClick={this.toggleParametersBox} className="parameters-header">
                        Parameters
                    </div>
                </div>

                <div onClick={this.toggleParametersBox} className="parameters-remove-container">
                    <span>X</span>
                </div>

                <div className="parameters-list">
                    {SETTINGS.parameters.map((parameter)=>{
                        return(
                            3
                        )
                    })}
                </div>
            </div>
        )
    }

}
export default ParametersBox;