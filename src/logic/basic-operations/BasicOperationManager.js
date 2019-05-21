import BasicOperationExecutor from "./BasicOperationExecutor";
import {LogicUtil} from '../../utils/LogicUtil'

export default class BasicOperationManager {


    /**
     *
     * @param imageDataObject
     * @return {ImageData}
     */
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


    /**
     *
     * @param leftImageData
     * @param rightImageData
     * @return {ImageData}
     */
    executeImageAddition = (leftImageData, rightImageData) => {

        const leftImageDataArray = leftImageData.data;
        const rightImageDataArray= rightImageData.data;

        if ((leftImageData.width !== rightImageData.width) || (leftImageData.height !== rightImageData.height)) {
            throw "Wrong images' dimensions!";
        }
        const imagesLength = leftImageDataArray.length;

        let modifiedImageData = [];
        for (let i = 0; i < imagesLength; i = i + 4) {

            const firstRGB = {
                red: leftImageDataArray[i] ,
                green:leftImageDataArray[i + 1],
                blue: leftImageDataArray[i + 2] ,
                alpha: leftImageDataArray[i + 3],
            };

            const secondRGB = {
                red: rightImageDataArray[i],
                green: rightImageDataArray[i + 1],
                blue: rightImageDataArray[i + 2],
                alpha: rightImageDataArray[i + 3]
            };

            const rgb = BasicOperationExecutor.add(firstRGB, secondRGB);
            LogicUtil.pushRGBObjectIntoArray(modifiedImageData, rgb);
        }

        let normalizedModifiedImageData = LogicUtil.normalizeRGBArray(modifiedImageData);
        let outputModifiedImageDataArray = new Uint8ClampedArray(normalizedModifiedImageData);
        return new ImageData(outputModifiedImageDataArray, leftImageData.width, leftImageData.height);
    };


    /**
     *
     * @param leftImageData
     * @param rightImageData
     * @return {ImageData}
     */
    executeImageSubtraction = (leftImageData, rightImageData) => {

        const leftImageDataArray = leftImageData.data;
        const rightImageDataArray= rightImageData.data;

        if ((leftImageData.width !== rightImageData.width) || (leftImageData.height !== rightImageData.height)) {
            throw "Wrong images' dimensions!";
        }
        const imagesLength = leftImageDataArray.length;

        let modifiedImageData = [];
        for (let i = 0; i < imagesLength; i = i + 4) {

            const firstRGB = {
                red: leftImageDataArray[i] ,
                green:leftImageDataArray[i + 1],
                blue: leftImageDataArray[i + 2] ,
                alpha: leftImageDataArray[i + 3],
            };

            const secondRGB = {
                red: rightImageDataArray[i],
                green: rightImageDataArray[i + 1],
                blue: rightImageDataArray[i + 2],
                alpha: rightImageDataArray[i + 3]
            };

            const rgb = BasicOperationExecutor.subtract(firstRGB, secondRGB);
            LogicUtil.pushRGBObjectIntoArray(modifiedImageData, rgb);
        }

        let normalizedModifiedImageData = LogicUtil.normalizeRGBArray(modifiedImageData);
        let outputModifiedImageDataArray = new Uint8ClampedArray(normalizedModifiedImageData);
        return new ImageData(outputModifiedImageDataArray, leftImageData.width, leftImageData.height);
    };


}