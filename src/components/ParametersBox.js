import React from "react";
import {SETTINGS} from '../settings/Settings';
//import {deleteImage, setMainImage} from "../actions/imageGalleryActions";
import {connect} from 'react-redux';
import {setParameters} from "../actions/parametersAction";
import KernelMatrix from "./KernelMatrix";
import {store} from '../index';

class ParametersBox extends React.Component {


    /**
     * Method is responsible for turning parameter mode
     * @param e
     */
    toggleParametersBox = (e) => {
        e.persist();
        if (e.target.parentNode.parentNode.classList.contains('active')) {
            e.target.parentNode.parentNode.classList.remove('active')
        } else {
            e.target.parentNode.parentNode.classList.add('active')
        }

    };


    onSetParameters = () => {
        let linCombVal = document.getElementById("linear-combination-parameter").value;
        let filterApplyNumber = document.getElementById("filter-apply-number").value;

        const kernel = store.getState().parameters.kernel;
        this.props.setParameters(
            {
                linearCombinationParameter: linCombVal,
                filterApplyNumber: filterApplyNumber,
                kernel: kernel
            }
        );
    };


    renderParameters = (parameter) => {
        switch (parameter.type) {
            case 'range':
                return (
                    <div key={parameter.name} className="single-parameter-container">
                        <span>{parameter.name === 'linear-combination-parameter' ? this.props.parameters.linearCombinationParameter : this.props.parameters.filterApplyNumber }</span>
                        <input min={parameter.min}
                               max={parameter.max}
                               step={parameter.step}
                               onChange={this.onSetParameters}
                               id = {parameter.name}
                               defaultValue={parameter.defaultValue}
                               type={parameter.type}/>
                        <span>{parameter.name}</span>
                    </div>);

            case 'matrix':
                return(
                    <KernelMatrix min={parameter.min}
                                  max={parameter.max}
                                  name = {parameter.name}
                                  type={parameter.type}/>
                );

            default:
                return;
        }
    };

    render() {
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