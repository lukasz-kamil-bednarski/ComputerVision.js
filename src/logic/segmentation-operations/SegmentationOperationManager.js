import {LogicUtil} from '../../utils/LogicUtil';
import ColorSpaceConverter from '../ColorSpaceConverter/ColorSpaceConverter';
export default class SegmentationOperationManager {


    static binarise(imageData, threshold){

        if(!threshold){
            threshold = 127;
        }
        let grayScaleImageData = new ColorSpaceConverter().switchToGrayScaleByLuminosity(imageData);
        let grayScalePixelArray = LogicUtil.zipImageDataIntoPixelArray(grayScaleImageData.data);
        const length = grayScalePixelArray.length;

        for(let i = 0; i < length; i++ ){
            const pixel = grayScalePixelArray[i];
            if((pixel.redChannel === pixel.greenChannel) && (pixel.greenChannel === pixel.blueChannel)){
                const luminosity = pixel.redChannel;

                if(luminosity < threshold){
                    pixel.redChannel = 0;
                    pixel.greenChannel = 0;
                    pixel.blueChannel= 0;
                }else{
                    pixel.redChannel = 255;
                    pixel.greenChannel =255;
                    pixel.blueChannel = 255;
                }

            }
        }
        return LogicUtil.unzipPixelArrayIntoImageData(grayScalePixelArray, imageData.width, imageData.height);
    }

}