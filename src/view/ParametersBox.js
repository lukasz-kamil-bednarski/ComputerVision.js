import React from "react";
import {SETTINGS} from '../settings/Settings';
import {deleteImage, setMainImage} from "../actions/imageGalleryActions";
import {connect} from 'react-redux';
import {setParameters} from "../actions/parametersAction";

class ParametersBox extends React.Component{


    /**
     * Method is responsible for turning parameter mode
     * @param e
     */
    toggleParametersBox = (e) =>{
        e.persist();
        if(e.target.parentNode.parentNode.classList.contains('active')){
            e.target.parentNode.parentNode.classList.remove('active')
        }else{
            e.target.parentNode.parentNode.classList.add('active')
        }

    };


    onSetParameters = (event) => {
       this.onSetParameters(
           {
               linearCombinationParameter: event.target.value
           }
       );
    };


    renderParameters = (parameter) =>{
        switch (parameter.name) {
            case 'linear-combination-parameter':
              return(
               <div key={parameter.name} className="single-parameter-container">
                   <span>{(this.props).parameters.linearCombinationParameter}</span>
                   <input min={parameter.min}
                          max={parameter.max}
                          step={parameter.step}
                          onChange={this.onSetParameters}
                          type={parameter.type}/>
                   <span>{parameter.name}</span>
               </div>
              );
            default:
                return null;
        }
    };

    render(){
        console.log(this.props.parameters);
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
                    {SETTINGS.parameters.map(this.renderParameters)}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {

    return {
        parameters: state.parameters
    }
};

const mapActionsToProps = {
    setParameters: setParameters
};


export default connect(mapStateToProps, mapActionsToProps)(ParametersBox);