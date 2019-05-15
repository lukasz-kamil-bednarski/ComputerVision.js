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

            const modifiedRedChannel = leftImageDataArray[i] + rightImageDataArray[i];
            const modifiedGreenChannel = leftImageDataArray[i + 1] + rightImageDataArray[i + 1];
            const modifiedBlueChannel = leftImageDataArray[i + 2] + rightImageDataArray[i + 2];
            const modifiedAlphaChannel = 255;

            modifiedImageData.push(modifiedRedChannel);
            modifiedImageData.push(modifiedGreenChannel);
            modifiedImageData.push(modifiedBlueChannel);
            modifiedImageData.push(modifiedAlphaChannel);
        }
        let outputModifiedImageDataArray = new Uint8ClampedArray(modifiedImageData);
        return new ImageData(outputModifiedImageDataArray, leftImageData.width, leftImageData.height);
    };
}