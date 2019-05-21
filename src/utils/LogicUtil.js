export class LogicUtil{
    /**
     * Helper method decomposing a RGB object and pushing into an array
     * @param outputArray
     * @param rgbObject
     */
    static pushRGBObjectIntoArray = (outputArray, rgbObject) =>{
        for(let prop in rgbObject){
            if(rgbObject.hasOwnProperty(prop)){
                outputArray.push(rgbObject[prop]);
            }
        }
    };

    static findArrayMax=(arr) =>{
        let max = 0;
        for(let num of arr){
            if(num > max){
                max = num;
            }
        }
        return max;
    };

    static normalizeRGBArray = (arr) =>{
        const max = LogicUtil.findArrayMax(arr);
        const length = arr.length;

        for(let i=0; i < length; i++){
            arr[i] = (arr[i]/max) * 255;
        }

        return arr;
    }
}