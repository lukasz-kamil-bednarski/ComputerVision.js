import BasicOperationManager from '../basic-operations/BasicOperationManager';
import {store} from '../../index';
import {LogicUtil} from "../../utils/LogicUtil";
import ContextOperationManager from "../context-operations/ContextOperationManager";

class ActionManager{


    static executeAction(actionID, additionalImageData = null){
        let canvas = document.getElementById("fun-canvas");
        let ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        const operationManager = new BasicOperationManager();
        let modifiedImageData;

        const parameters = store.getState().parameters;

        try {
            switch (actionID) {

                case '1':
                    modifiedImageData = operationManager.executeImageNegative(imageData);
                    return;

                case '2':
                    modifiedImageData = operationManager.executeImageAddition(imageData, additionalImageData);
                    break;
                case '3':
                    modifiedImageData = operationManager.executeImageSubtraction(imageData, additionalImageData);
                    break;

                case '4':
                    const linearCombinationParameter = parameters.linearCombinationParameter;
                    modifiedImageData = operationManager.executeImageLinearCombination(imageData, additionalImageData, linearCombinationParameter);
                    break;
                case '5':
                    let matrix =LogicUtil.convertImageDataIntoPixelMatrix(imageData);
                    const kernel = [[1,0,1], [0,1,0], [1,0,1]];
                    ContextOperationManager.executeImageConvolution(matrix, kernel);
                    return;
                default:
                    console.log("INTERNAL ERROR");
                    return;
            }
        }catch (e) {
            alert(e);
        }finally {
            //ctx.putImageData(modifiedImageData, 0,0);
        }

    }
}

export default ActionManager;