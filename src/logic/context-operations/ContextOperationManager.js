class ContextOperationManager{

    static executeImageConvolution = (imageMatrix, kernel) =>{

        const height = imageMatrix.length;
        const width = imageMatrix[0].length === imageMatrix[height-1].length ? imageMatrix[0].length : null;

        console.log(height);
        console.log(width);
        if(height > 0 && width > 0){

            for(let row = 1; row <= height -2; row++){

                for(let column = 1; column <= width-2; column++){
                    const context =
                        [
                            [imageMatrix[row-1][column-1],imageMatrix[row-1][column], imageMatrix[row-1][column+1]],
                            [imageMatrix[row][column-1],imageMatrix[row][column],imageMatrix[row][column+1]],
                            [imageMatrix[row+1][column-1],imageMatrix[row+1][column],imageMatrix[row+1][column+1]],
                        ];
                    console.log(context);
                    return;
                }
            }

        }
    }
}
export default ContextOperationManager;