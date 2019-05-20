import BasicOperationManager from '../basic-operations/BasicOperationManager';

export default class ActionManager{


    static executeAction(actionID, additionalImageData = null){
        let canvas = document.getElementById("fun-canvas");
        let ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        const operationManager = new BasicOperationManager();
        let modifiedImageData;

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

                default:
                    console.log("INTERNAL ERROR");
            }
        }catch (e) {
            alert(e);
        }finally {
            ctx.putImageData(modifiedImageData, 0,0);
        }

    }
}