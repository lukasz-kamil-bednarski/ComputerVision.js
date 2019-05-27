class ContextOperationManager{

    static executeImageConvolution = (imageMatrix, kernel) =>{

        const height = imageMatrix.length;
        const width = imageMatrix[0].length === imageMatrix[height-1].length ? imageMatrix[0].length : null;
        let newImageMatrix = imageMatrix.slice(0);
        if(height > 0 && width > 0){

            for(let row = 0; row < height; row++){
                for(let column = 0; column < width; column++){

                    if(row === 0 || row === height-1){
                        newImageMatrix[row][column] = imageMatrix[row][column];
                        continue;
                    }

                    if(column === 0 || row === width - 1){
                        newImageMatrix[row][column] = imageMatrix[row][column];
                        continue;
                    }

                    const context =
                        [
                            [imageMatrix[row-1][column-1],imageMatrix[row-1][column], imageMatrix[row-1][column+1]],
                            [imageMatrix[row][column-1],imageMatrix[row][column],imageMatrix[row][column+1]],
                            [imageMatrix[row+1][column-1],imageMatrix[row+1][column],imageMatrix[row+1][column+1]],
                        ];
                   this.convolve(context, kernel);
                }
            }

        }
       // return newImageMatrix;
    };


    static convolve(context, kernel){
        let redAccumulator=0;
        let greenAccumulator=0;
        let blueAccumulator=0;
        const kernelDimension = 3;

        for(let i = 0; i<context.length; i++){

            for (let j = 0; j < 3; j++){

                if(context[i][j].redChannel){
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
        }

        redAccumulator /= Math.pow(kernelDimension,2);
        greenAccumulator /= Math.pow(kernelDimension,2);
        blueAccumulator /= Math.pow(kernelDimension,2);
        redAccumulator = Math.floor(redAccumulator);
        greenAccumulator = Math.floor(greenAccumulator);
        blueAccumulator = Math.floor(blueAccumulator);

        return{
            redChannel: redAccumulator,
            greenChannel: greenAccumulator,
            blueChannel: blueAccumulator,
            alphaChannel: 255
        }
    }


}
export default ContextOperationManager;