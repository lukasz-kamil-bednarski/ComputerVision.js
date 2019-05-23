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

    static combineLinear(firstRGB, secondRGB,parameter){
        return {
            red: parameter*firstRGB.red + (1-parameter)*secondRGB.red,
            green: parameter*firstRGB.green + (1-parameter)*secondRGB.green,
            blue: parameter* firstRGB.blue +(1-parameter)*secondRGB.blue,
            alpha: firstRGB.alpha + secondRGB.alpha
        };
    }

    negative(){

    }
}