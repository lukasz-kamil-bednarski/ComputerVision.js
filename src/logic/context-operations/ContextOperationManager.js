import {LogicUtil} from "../../utils/LogicUtil";

class ContextOperationManager {

    static executeImageConvolution = (imageMatrix, kernel, divide) => {

        const height = imageMatrix.length;
        const width = imageMatrix[0].length === imageMatrix[height - 1].length ? imageMatrix[0].length : null;
        let newImageMatrix = ContextOperationManager.deepCopy(imageMatrix);

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
                    newImageMatrix[row][column] = this.convolve(context, kernel, divide);
                }
            }
        }
        const unzippedDataArray = new Uint8ClampedArray(LogicUtil.unzipPixelMatrixIntoImageData(newImageMatrix));
        return new ImageData(unzippedDataArray, width, height);
    };


    static convolve(context, kernel, isDivision) {
        let redAccumulator = 0;
        let greenAccumulator = 0;
        let blueAccumulator = 0;
        const kernelDimension = 3;
        const noneOpacityValue = 255;
        for (let i = 0; i < kernelDimension; i++) {

            for (let j = 0; j < kernelDimension; j++) {
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

        if(isDivision){
            redAccumulator /= kernelDimension*kernelDimension;
            greenAccumulator /= kernelDimension*kernelDimension;
            blueAccumulator /= kernelDimension*kernelDimension;
        }

        return {
            redChannel: redAccumulator,
            greenChannel: greenAccumulator,
            blueChannel: blueAccumulator,
            alphaChannel: noneOpacityValue
        }
    }

    static deepCopy = (matrix) =>{
        let newMatrix = [];
        for(let array of matrix){
            newMatrix.push([...array]);
        }
        return newMatrix;
    }
}

export default ContextOperationManager;