import {LogicUtil} from '../../utils/LogicUtil';

export default class ColorSpaceConverter {

    luminosityWeights = {
        red: 0.39,
        green: 0.59,
        blue: 0.11
    };

    switchToGrayScaleByLuminosity = (imageData) => {
        const pixelArray = LogicUtil.zipImageDataIntoPixelArray(imageData.data);
        const length = pixelArray.length;
        for(let i = 0; i < length; i++){
            let pixel = pixelArray[i];
            let modifiedPixel={};
            let newValue = pixel.redChannel * this.luminosityWeights.red +  pixel.greenChannel * this.luminosityWeights.green + pixel.blueChannel * this.luminosityWeights.blue;
            modifiedPixel.redChannel = newValue;
            modifiedPixel.greenChannel = newValue;
            modifiedPixel.blueChannel = newValue;
            modifiedPixel.alphaChannel = pixel.alphaChannel;
            pixelArray[i] = modifiedPixel;
        }
        return LogicUtil.unzipPixelArrayIntoImageData(pixelArray, imageData.width, imageData.height);
    }


}