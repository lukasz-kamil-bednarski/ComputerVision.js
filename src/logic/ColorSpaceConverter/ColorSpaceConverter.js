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
            pixel.red = pixel.red * this.luminosityWeights.red;
            pixel.green = pixel.green * this.luminosityWeights.green;
            pixel.blue = pixel.blue * this.luminosityWeights.blue;
            pixelArray[i] = pixel;
        }
        return LogicUtil.unzipPixelArrayIntoImageData(pixelArray, imageData.width, imageData.height);
    }


}