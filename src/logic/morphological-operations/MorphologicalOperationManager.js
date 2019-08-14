import {LogicUtil} from "../../utils/LogicUtil";


export default class MorphologicalOperationManagerr {

    static executeErosion(imageData){
        let pixelMatrix = LogicUtil.convertImageDataIntoPixelMatrix(imageData);

        const height = pixelMatrix.length;

        const width = pixelMatrix[0].length === pixelMatrix[height - 1].length ? pixelMatrix[0].length : null;
        if(width && height){
            for(let row = 0; row<height; row++){
                if(row === 0 || row === height-1){
                    continue;
                }
                for(let col = 0; col<width; col++){
                    if(col === 0 || col === width-1){
                        continue;
                    }
                    const currentPixel = pixelMatrix[row][col];
                    console.log(currentPixel);
                    return 0;
                };

            }
        }



    }

}