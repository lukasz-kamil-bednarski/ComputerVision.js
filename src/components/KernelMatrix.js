import React from "react";
import {store} from '../index';
import {setParameters} from "../actions/parametersAction";
import {connect} from 'react-redux';


class KernelMatrix extends React.Component {

    /**
     * Handling a singular input from the kernel matrix
     * @param event
     * @param prevKernel
     */
    handleKernelChange = (event, prevKernel) => {
        event.persist();
        const rowIndex = parseInt(event.target.dataset.rowIndex);
        const colIndex = parseInt(event.target.dataset.colIndex);
        prevKernel[rowIndex][colIndex] = parseInt(event.target.value);
        let lcp = document.getElementById("linear-combination-parameter").value;
        let fan = document.getElementById("filter-apply-number").value;
        this.props.setParameters({
            linearCombinationParameter: lcp,
            filterApplyNumber: fan,
            kernel: prevKernel
        });
    };

    render() {

        const kernel = store.getState().parameters.kernel;
        let rowIndex = -1;
        return (
            <div className="own-filter-container">
                <div className="kernel-list">
                    {
                        kernel.map((row) => {
                            let colIndex = -1;
                            rowIndex++;
                            return (
                                row.map((col) => {
                                    colIndex++;
                                    return (
                                        <div className="single-kernel-value-container">
                                            <input min={this.props.min}
                                                   max={this.props.max}
                                                   defaultValue={row[col]}
                                                   data-row-index = {rowIndex}
                                                   data-col-index = {colIndex}
                                                   onChange={(e) =>this.handleKernelChange(e, kernel)}
                                            />
                                        </div>
                                    )
                                })
                            )
                        })
                    }
                </div>
                <span>{this.props.name}</span>
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
  setParameters : setParameters
};

export default connect(mapStateToProps, mapActionsToProps)(KernelMatrix);
