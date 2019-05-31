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
     * Normalizing an array into [0-255] range
     * @param arr
     * @returns {*}
     */
    static normalizeRGBArray = (arr) =>{
        const max = LogicUtil.findArrayMax(arr);
        const min = LogicUtil.findArrayMin(arr);
        const length = arr.length;

        for(let i=0; i < length; i++){
            arr[i] = ((arr[i]-min)/(max-min)) * 255;
        }

        console.log(arr);
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
    }
}