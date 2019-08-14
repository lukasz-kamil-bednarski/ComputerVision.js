import {LogicUtil} from "../../utils/LogicUtil";
import SegmentationOperationManager from '../segmentation-operations/SegmentationOperationManager';

export default class MorphologicalOperationManagerr {

    static executeMorphologicalOperation(imageData) {
        imageData = SegmentationOperationManager.binarise(imageData);
        let pixelMatrix = LogicUtil.convertImageDataIntoPixelMatrix(imageData);
        let outputMatrix = LogicUtil.deepCopy(pixelMatrix);
        const height = pixelMatrix.length;
        const width = pixelMatrix[0].length === pixelMatrix[height - 1].length ? pixelMatrix[0].length : null;
        for (let row = 0; row < height; row++) {
            if (row === 0 || row === height - 1) {
                continue;
            }
            for (let col = 0; col < width; col++) {
                if (col === 0 || col === width - 1) {
                    continue;
                }
                const val = this.erode(this.getMooreNeighborhood(pixelMatrix, row, col));
                outputMatrix[row][col] = {
                    redChannel: val,
                    greenChannel: val,
                    blueChannel: val,
                    alphaChannel: 255
                };
            }
        }
        return new ImageData(new Uint8ClampedArray(LogicUtil.unzipPixelMatrixIntoImageData(outputMatrix)), width, height);
    }

    /**
     * Erosion operation is equivalent to minimal filter
     * Method finding the minimal value in neighborhood
     * Every channel has the same value - so the choice of which channel we compare is arbitrary
     * @param mask
     */
    static erode(mask) {
        let min = mask[0][0].redChannel;
        for (let i = 0; i < mask.length; i++) {
            for (let j = 0; j < mask[i].length; j++) {
                if (mask[i][j].redChannel < min) {
                    min = mask[i][j].redChannel;
                }
            }
        }
        return min;
    }

    /**
     * Dilation operation is equivalent to maximal filter
     * Method finding the maximal value in neighborhood
     * @param mask
     */
    static dilate(mask) {
        return [].concat(...mask).max();
    }

    /**
     * Creating Moore neighborhood
     * @param array
     * @param row
     * @param col
     * @returns {*[]}
     */
    static getMooreNeighborhood(array, row, col) {
        return [
            [array[row - 1][col - 1], array[row - 1][col], array[row - 1][col + 1]],
            [array[row][col - 1], array[row][col], array[row][col + 1]],
            [array[row + 1][col - 1], array[row + 1][col], array[row + 1][col + 1]]
        ]
    }
}