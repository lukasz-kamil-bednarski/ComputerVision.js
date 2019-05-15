export default class BasicOperationManager {

    executeImageNegative = (imageDataObject) => {
        let imageData = imageDataObject.data;
        const dataLength = imageData.length;
        let modifiedImageData= [];

        for (let i = 0; i < dataLength; i = i + 4) {

            const modifiedRedChannel = 255 - imageData[i];
            const modifiedGreenChannel = 255 - imageData[i + 1];
            const modifiedBlueChannel = 255 - imageData[i + 2];
            const modifiedAlphaChannel= imageData[i+3];

            modifiedImageData.push(modifiedRedChannel);
            modifiedImageData.push(modifiedGreenChannel);
            modifiedImageData.push(modifiedBlueChannel);
            modifiedImageData.push(modifiedAlphaChannel);
        }
        return new ImageData(new Uint8ClampedArray(modifiedImageData), imageDataObject.width, imageDataObject.height);
    }
}