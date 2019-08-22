import {SETTINGS} from "../settings/Settings";

let getCanvasSize = () => {
    let width;
    let height;
    if(window.innerWidth >= 1200){
        width = SETTINGS.funCanvasDesktopSize.width;
        height = SETTINGS.funCanvasDesktopSize.height;
    }else{
        width = SETTINGS.funCanvasSmallDesktopSize.width;
        height = SETTINGS.funCanvasSmallDesktopSize.height;
    }

    return {
        width: width,
        height: height
    }
};

export default getCanvasSize;