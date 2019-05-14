import BasicOperationManager from '../basic-operations/BasicOperationManager';

export default class ActionManager{


    static executeAction(actionID, canvas){
        let ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        switch (actionID) {

            case '1':
                const operationManager = new BasicOperationManager();
                const modifiedImageData = operationManager.executeImageNegative(imageData);
                ctx.putImageData(modifiedImageData, 0,0);
                break;

            default:
                console.log("INTERNAL ERROR");
        }
    }
}