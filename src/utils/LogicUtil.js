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

    /**
     * Method finding a maximal element in an array
     * @param arr
     * @returns {number}
     */
    static findArrayMax=(arr) =>{
        let max = arr[0];
        for(let num of arr){
            if(num > max){
                max = num;
            }
        }
        return max;
    };

    /**
     * Method finding a minimal element in an array
     * @param arr
     * @returns {number}
     */
    static findArrayMin=(arr) =>{
        let min = arr[0];
        for(let num of arr){
            if(num < min){
                min = num;
            }
        }
        return min;
    };


    /**
     * Normalizing an array into [0-255]
     * @param arr
     * @returns {*}
     */
    static normalizeRGBArray = (arr) =>{
        const max = LogicUtil.findArrayMax(arr);
        //const min = LogicUtil.findArrayMin(arr);
        const length = arr.length;

        for(let i=0; i < length; i++){
            arr[i] = ((arr[i]/max) * 255);
        }

        return arr;
    };

    /**
     * Converting image data sequence into matrix of pixels
     * @param imageData
     * @returns {Array}
     */
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

    /**
     * Converting input: ImageData(sequence of numbers) object into an array of objects(pixel objects)
     * @param rawImageData
     * @returns {Array}
     */
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

    /**
     * Unzipping pixel matrix into image data sequence
     * @param pixelMatrix
     * @returns {Array}
     */
    static unzipPixelMatrixIntoImageData = (pixelMatrix) =>{
        const height = pixelMatrix.length;
        const width = pixelMatrix[0].length === pixelMatrix[height - 1].length ? pixelMatrix[0].length : null;
        let imageDataArray = [];
        if(width > 0 && height > 0){
            for(let row=0;row<height;row++){
                for(let column=0;column<width;column++){
                    const pixel = pixelMatrix[row][column];
                    imageDataArray.push(pixel.redChannel);
                    imageDataArray.push(pixel.greenChannel);
                    imageDataArray.push(pixel.blueChannel);
                    imageDataArray.push(pixel.alphaChannel);
                }
            }
        }
        return imageDataArray;
    };


    /**
     * Uzipping pixelArray into ImageData
     * @param pixelArray
     * @param width
     * @param height
     * @return {ImageData}
     */
    static unzipPixelArrayIntoImageData = (pixelArray, width, height) => {
        let sequence = [];
        const length = pixelArray.length;

        for(let i =0; i<length; i++){
            sequence.push(pixelArray[i].redChannel);
            sequence.push(pixelArray[i].greenChannel);
            sequence.push(pixelArray[i].blueChannel);
            sequence.push(pixelArray[i].alphaChannel);
        }
        return new ImageData(new Uint8ClampedArray(sequence), width, height);
};


    /**
     * Taking a decision if normalization should be executed
     * @param kernel
     * @returns {boolean}
     */
    static decideNormalization = (kernel)=>{
        const rowNumber = kernel.length;
        let accumulator=0;
        for(let i=0; i<rowNumber;i++){
            for(let j=0; j<kernel[i].length; j++){
                accumulator+=kernel[i][j];
            }
        }
        return accumulator>0;
    };


    /**
     * Finding max red,green,blue values
     * @param rgbMatrix
     * @returns {{rMax: number, gMax: number, bMax: number}}
     */
    static findRGBMatrixMax = (rgbMatrix) =>{
        const height = rgbMatrix.length;
        let redMax = 0;
        let greenMax = 0;
        let blueMax = 0;
        for(let row = 0; row<height; row++){
            for(let col = 0; col<rgbMatrix[row].length; col++){
                let pixel = {
                    red: rgbMatrix[row][col].redChannel,
                    green: rgbMatrix[row][col].greenChannel,
                    blue: rgbMatrix[row][col].blueChannel
                };
                if(pixel.red > redMax){
                    redMax = pixel.red
                }
                if(pixel.green > greenMax){
                    greenMax = pixel.green
                }
                if(pixel.blue > blueMax){
                    blueMax = pixel.blue
                }
            }
        }
        return {
            rMax: redMax,
            gMax: greenMax,
            bMax: blueMax
        }
    };

    /**
     * Finding max red,green,blue values
     * @param rgbMatrix
     * @returns {{rMax: number, gMax: number, bMax: number}}
     */
    static findRGBMatrixMin = (rgbMatrix) =>{
        const height = rgbMatrix.length;
        let redMin = 0;
        let greenMin = 0;
        let blueMin= 0;
        for(let row = 0; row<height; row++){
            for(let col = 0; col<rgbMatrix[row].length; col++){
                let pixel = {
                    red: rgbMatrix[row][col].redChannel,
                    green: rgbMatrix[row][col].greenChannel,
                    blue: rgbMatrix[row][col].blueChannel
                };
                if(pixel.red < redMin){
                    redMin = pixel.red
                }
                if(pixel.green < greenMin){
                    greenMin= pixel.green
                }
                if(pixel.blue < blueMin){
                    blueMin = pixel.blue
                }
            }
        }
        return {
            rMin: redMin,
            gMin: greenMin,
            bMin: blueMin
        }
    };

    /**
     * Normalizing rgb matrix
     * @param rgbMatrix
     * @param maximals
     * @param minimals
     * @returns {*}
     */
    static normalizeRGBMatrix = (rgbMatrix,maximals, minimals) =>{
        const height = rgbMatrix.length;
        for(let row = 0; row<height;row++){
            for(let col =0; col<rgbMatrix[row].length; col++){
                const pixel = {
                    redChannel: rgbMatrix[row][col].redChannel,
                    greenChannel: rgbMatrix[row][col].greenChannel,
                    blueChannel: rgbMatrix[row][col].blueChannel
                };
                rgbMatrix[row][col].redChannel = ((pixel.redChannel - minimals.rMin)/(maximals.rMax - minimals.rMin))*255;
                rgbMatrix[row][col].greenChannel = ((pixel.greenChannel- minimals.gMin)/(maximals.gMax - minimals.gMin)) *255;
                rgbMatrix[row][col].blueChannel = ((pixel.blueChannel - minimals.bMin)/(maximals.bMax - minimals.bMin))*255;
            }
        }
        return rgbMatrix;
    }
}