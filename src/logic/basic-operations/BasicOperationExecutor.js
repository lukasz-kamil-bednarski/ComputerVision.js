export default class BasicOperationExecutor{

    static add(firstRGB, secondRGB){
        return {
            red: firstRGB.red + secondRGB.red,
            green:firstRGB.green + secondRGB.green,
            blue: firstRGB.blue + secondRGB.blue,
            alpha: firstRGB.alpha + secondRGB.alpha
        };
    }

    static subtract(firstRGB, secondRGB){
        return {
            red: firstRGB.red - secondRGB.red,
            green:firstRGB.green - secondRGB.green,
            blue: firstRGB.blue - secondRGB.blue,
            alpha: firstRGB.alpha + secondRGB.alpha
        };
    }

    combineLinear(parameter){}

    negative(){

    }
}