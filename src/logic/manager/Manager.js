import BasicOperationManager from '../basic-operations/BasicOperationManager';

export default class ActionManager{


    static executeAction(actionID, additionalImageData = null){
        let canvas = document.getElementById("fun-canvas");
        let ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        const operationManager = new BasicOperationManager();
        let modifiedImageData;
        switch (actionID) {

            case '1':
                modifiedImageData = operationManager.executeImageNegative(imageData);
                ctx.putImageData(modifiedImageData, 0,0);
                break;

            case '2':
                modifiedImageData = operationManager.executeImageAddition(imageData, additionalImageData);
                ctx.putImageData(modifiedImageData, 0,0);
                break;
            default:
                console.log("INTERNAL ERROR");
        }
    }
}