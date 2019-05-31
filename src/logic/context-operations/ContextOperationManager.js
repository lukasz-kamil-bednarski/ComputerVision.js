import {LogicUtil} from "../../utils/LogicUtil";

class ContextOperationManager {

    static executeImageConvolution = (imageMatrix, kernel) => {

        const height = imageMatrix.length;
        const width = imageMatrix[0].length === imageMatrix[height - 1].length ? imageMatrix[0].length : null;
        let newImageMatrix = imageMatrix.slice(0);
        if (height > 0 && width > 0) {
            for (let row = 0; row < height - 1; row++) {
                for (let column = 0; column < width - 1; column++) {

                    if (row === 0 || row === height - 1) {
                        newImageMatrix[row][column] = imageMatrix[row][column];
                        continue;
                    }

                    if (column === 0 || column === width - 1) {
                        newImageMatrix[row][column] = imageMatrix[row][column];
                        continue;
                    }

                    const context =
                        [
                            [imageMatrix[row - 1][column - 1], imageMatrix[row - 1][column], imageMatrix[row - 1][column + 1]],
                            [imageMatrix[row][column - 1], imageMatrix[row][column], imageMatrix[row][column + 1]],
                            [imageMatrix[row + 1][column - 1], imageMatrix[row + 1][column], imageMatrix[row + 1][column + 1]],
                        ];
                    newImageMatrix[row][column] = this.convolve(context, kernel);
                }
            }
        }
        const unzippedDataArray = new Uint8ClampedArray(LogicUtil.unzipPixelMatrixIntoImageData(newImageMatrix));
        return new ImageData(unzippedDataArray, width, height);
    };


    static convolve(context, kernel) {
        let redAccumulator = 0;
        let greenAccumulator = 0;
        let blueAccumulator = 0;
        const kernelDimension = 3;
        const kernelDimensionSurface = Math.pow(kernelDimension, 2);
        const noneOpacityValue = 255;

        for (let i = 0; i < context.length; i++) {

            for (let j = 0; j < context[i].length; j++) {
                const pixel = {
                    redChannel: context[i][j].redChannel,
                    greenChannel: context[i][j].greenChannel,
                    blueChannel: context[i][j].blueChannel
                };
                redAccumulator += pixel.redChannel * kernel[i][j];
                greenAccumulator += pixel.greenChannel * kernel[i][j];
                blueAccumulator += pixel.blueChannel * kernel[i][j];
            }
        }
        redAccumulator /= kernelDimensionSurface;
        greenAccumulator /= kernelDimensionSurface;
        blueAccumulator /= kernelDimensionSurface;

        return {
            redChannel: redAccumulator,
            greenChannel: greenAccumulator,
            blueChannel: blueAccumulator,
            alphaChannel: noneOpacityValue
        }
    }
}

export default ContextOperationManager;