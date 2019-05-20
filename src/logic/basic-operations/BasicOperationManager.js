export default class BasicOperationManager {

    executeImageNegative = (imageDataObject) => {
        let imageData = imageDataObject.data;
        const dataLength = imageData.length;
        let modifiedImageData = [];

        for (let i = 0; i < dataLength; i = i + 4) {

            const modifiedRedChannel = 255 - imageData[i];
            const modifiedGreenChannel = 255 - imageData[i + 1];
            const modifiedBlueChannel = 255 - imageData[i + 2];
            const modifiedAlphaChannel = imageData[i + 3];

            modifiedImageData.push(modifiedRedChannel);
            modifiedImageData.push(modifiedGreenChannel);
            modifiedImageData.push(modifiedBlueChannel);
            modifiedImageData.push(modifiedAlphaChannel);
        }
        return new ImageData(new Uint8ClampedArray(modifiedImageData), imageDataObject.width, imageDataObject.height);
    };

    executeImageAddition = (leftImageData, rightImageData) => {

        const leftImageDataArray = leftImageData.data;
        const rightImageDataArray= rightImageData.data;

        if ((leftImageData.width !== rightImageData.width) || (leftImageData.height !== rightImageData.height)) {
            throw "Wrong images' dimensions!";
        }
        const imagesLength = leftImageDataArray.length;

        let modifiedImageData = [];
        for (let i = 0; i < imagesLength; i = i + 4) {

            const rgb = {
                red: leftImageDataArray[i] + rightImageDataArray[i],
                green:leftImageDataArray[i + 1] + rightImageDataArray[i + 1],
                blue: leftImageDataArray[i + 2] + rightImageDataArray[i + 2],
                alpha: leftImageDataArray[i + 3] + rightImageDataArray[i + 3]
            };
            this.pushRGBObjectIntoArray(modifiedImageData, rgb);
        }

        let normalizedModifiedImageData = this.normalizeRGBArray(modifiedImageData);
        let outputModifiedImageDataArray = new Uint8ClampedArray(normalizedModifiedImageData);
        return new ImageData(outputModifiedImageDataArray, leftImageData.width, leftImageData.height);
    };


    /**
     * Helper method decomposing a RGB object and pushing into an array
     * @param outputArray
     * @param rgbObject
     */
    pushRGBObjectIntoArray = (outputArray, rgbObject) =>{
        for(let prop in rgbObject){
            if(rgbObject.hasOwnProperty(prop)){
                outputArray.push(rgbObject[prop]);
            }
        }
    };

    findArrayMax=(arr) =>{
        let max = 0;
        for(let num of arr){
            if(num > max){
                max = num;
            }
        }
        return max;
    };

    normalizeRGBArray = (arr) =>{
        const max = this.findArrayMax(arr);
        const length = arr.length;

        for(let i=0; i < length; i++){
            arr[i] = (arr[i]/max) * 255;
        }

        return arr;
    }


}