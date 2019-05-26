export class LogicUtil{
    /**
     * Helper method decomposing a RGB object and pushing into an array
     * @param outputArray
     * @param rgbObject
     */
    static pushRGBObjectIntoArray = (outputArray, rgbObject) =>{
        for(let prop in rgbObject){
            if(rgbObject.hasOwnProperty(prop)){
                outputArray.push(rgbObject[prop]);
            }
        }
    };

    static findArrayMax=(arr) =>{
        let max = 0;
        for(let num of arr){
            if(num > max){
                max = num;
            }
        }
        return max;
    };

    static normalizeRGBArray = (arr) =>{
        const max = LogicUtil.findArrayMax(arr);
        const length = arr.length;

        for(let i=0; i < length; i++){
            arr[i] = (arr[i]/max) * 255;
        }

        return arr;
    };

   static convertImageDataIntoPixelMatrix(imageData) {

        const size = {
            width: imageData.width,
            height: imageData.height
        };

        const zippedData= LogicUtil.zipImageDataIntoPixelArray(imageData.data);
        const zippedDataLength= zippedData.length;

        let outputPixelMatrix= [];
        let currentRow = [];
        let counter = 0;
        let columnCounter = 1;

        while(counter < zippedDataLength){

            const currentPixel = zippedData[counter];

            if(columnCounter === size.width + 1 || counter === zippedDataLength - 1){
                if(counter === zippedDataLength -1){
                    currentRow.push(currentPixel);
                    outputPixelMatrix.push(currentRow);
                    return outputPixelMatrix;
                }else {
                    outputPixelMatrix.push(currentRow);
                    currentRow = [];
                    columnCounter = 1;
                }
            }

            currentRow.push(currentPixel);
            columnCounter += 1;
            counter+=1;

        }
        return outputPixelMatrix;
    }

    static zipImageDataIntoPixelArray = (rawImageData) => {


        const dataLength= rawImageData.length;
        let outputImageData = [];

        for (let i = 0; i < dataLength; i = i + 4) {

            const currentPixel = {
                redChannel: rawImageData[i],
                greenChannel: rawImageData[i + 1],
                blueChannel: rawImageData[i + 2],
                alphaChannel: rawImageData[i + 3],
            };
            outputImageData.push(currentPixel);
        }
        return outputImageData;
    };
}