import BasicOperationManager from '../basic-operations/BasicOperationManager';
import {store} from '../../index';
import {LogicUtil} from "../../utils/LogicUtil";
import ContextOperationManager from "../context-operations/ContextOperationManager";
import ColorSpaceConverter from '../ColorSpaceConverter/ColorSpaceConverter';

class ActionManager{


    static executeAction(actionID, additionalImageData = null){
        let canvas = document.getElementById("fun-canvas");
        let ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        const operationManager = new BasicOperationManager();
        let modifiedMatrix;
        let modifiedImageData;
        let matrix;
        const parameters = store.getState().parameters;
        const gaussianKernel = [[1,1,1],[1,1,1],[1,1,1]];
        const laplacianKernel = [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]];
        const filterApplyNumber = store.getState().parameters.filterApplyNumber;

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
                    if(filterApplyNumber > 1){
                        matrix = this.loopConvolution(ContextOperationManager.executeImageConvolution, matrix,gaussianKernel,filterApplyNumber, true);
                        modifiedImageData= ContextOperationManager.convertPixelMatrixIntoImageData(matrix, imageData.width, imageData.height);
                    }else{
                        modifiedMatrix = ContextOperationManager.executeImageConvolution(matrix, gaussianKernel, true);
                        modifiedImageData= ContextOperationManager.convertPixelMatrixIntoImageData(modifiedMatrix, imageData.width, imageData.height);
                    }
                    break;

                case '6':
                    matrix =LogicUtil.convertImageDataIntoPixelMatrix(imageData);
                    if(filterApplyNumber > 1){
                        matrix = this.loopConvolution(ContextOperationManager.executeImageConvolution, matrix, laplacianKernel,filterApplyNumber, true);
                        modifiedImageData= ContextOperationManager.convertPixelMatrixIntoImageData(matrix, imageData.width, imageData.height);
                    }else{
                        modifiedMatrix = ContextOperationManager.executeImageConvolution(matrix, laplacianKernel, true);
                        modifiedImageData= ContextOperationManager.convertPixelMatrixIntoImageData(modifiedMatrix, imageData.width, imageData.height);
                    }
                    break;

                case '7':
                    const ownKernel = store.getState().parameters.kernel;
                    matrix =LogicUtil.convertImageDataIntoPixelMatrix(imageData);
                    if(filterApplyNumber > 1){
                        matrix = this.loopConvolution(ContextOperationManager.executeImageConvolution, matrix,ownKernel,filterApplyNumber, true);
                        modifiedImageData= ContextOperationManager.convertPixelMatrixIntoImageData(matrix, imageData.width, imageData.height);
                    }else{
                        modifiedMatrix = ContextOperationManager.executeImageConvolution(matrix, ownKernel, true);
                        modifiedImageData= ContextOperationManager.convertPixelMatrixIntoImageData(modifiedMatrix, imageData.width, imageData.height);
                    }
                    break;

                case '8':
                    new ColorSpaceConverter().switchToGrayScaleByLuminosity(imageData);
                    return;
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

    static loopConvolution(convolve,matrix, kernel, number, isNormalized){
        let result = matrix;
        for(let i=0;i< number; i++){
            result = convolve(result, kernel, isNormalized);
        }
        return result;
    }
}
export default ActionManager;