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
        let matrix;
        const parameters = store.getState().parameters;
        const gaussianKernel = [[1,1,1],[1,1,1],[1,1,1]];
        const laplacianKernel = [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]];

        try {
            switch (actionID) {

                case '1':
                    modifiedImageData = operationManager.executeImageNegative(imageData);
                    break;

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
                    matrix =LogicUtil.convertImageDataIntoPixelMatrix(imageData);
                    modifiedImageData = ContextOperationManager.executeImageConvolution(matrix, gaussianKernel, true);
                    break;

                case '6':
                    matrix =LogicUtil.convertImageDataIntoPixelMatrix(imageData);
                    modifiedImageData = ContextOperationManager.executeImageConvolution(matrix, laplacianKernel, false);
                    break;

                case '7':
                    const ownKernel = store.getState().parameters.kernel;
                    matrix =LogicUtil.convertImageDataIntoPixelMatrix(imageData);
                    console.log(LogicUtil.decideNormalization(ownKernel));
                    modifiedImageData = ContextOperationManager.executeImageConvolution(matrix, ownKernel, false);
                    break;
                default:
                    console.log("INTERNAL ERROR");
                    return;
            }
            ctx.putImageData(modifiedImageData, 0,0);
        }catch (e) {
            alert(e);
        }
    }
}
export default ActionManager;