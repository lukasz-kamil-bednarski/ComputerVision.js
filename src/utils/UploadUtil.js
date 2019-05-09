import {Settings} from '../settings/Settings'

export default class UploadUtil {

    /**
     * Method responsible for handling image input from file.
     * @param event
     * @param image
     */
    static onImageUpload = (event, image) => {

        const file = event.target.files[0];

        if(file) {
            image.src = URL.createObjectURL(file);
        }
        return image;

    };

    /**
     * Method drawing a given Image object onto a given canvas element with a given size
     * @param image
     * @param canvas
     */
    static drawScaledImageOntoCanvas(image, canvas){
        const ctx = canvas.getContext("2d");

        const imgWidth = image.naturalWidth;
        const imgHeight = image.naturalHeight;
        let aspectRatio;

        if(ctx !== null) {


            const width = Settings.funCanvasDesktopSize.width;
            const height = Settings.funCanvasDesktopSize.height;

            ctx.canvas.width = width;
            ctx.canvas.height = height; //restoring default values


            ctx.clearRect(0, 0, width, height);

            if (imgWidth < width && imgHeight < height) {
                ctx.canvas.width = imgWidth;
                ctx.canvas.height = imgHeight;
                ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

            } else {
                if (imgWidth >= imgHeight) {
                    aspectRatio = width / imgWidth;
                    ctx.canvas.width = width;
                    ctx.canvas.height = imgHeight * aspectRatio;
                    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
                } else {
                    aspectRatio = height / imgHeight;
                    ctx.canvas.width = imgWidth * aspectRatio;
                    ctx.canvas.height = height;
                    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
                }
            }

            return {
                data:ctx.getImageData(0,0,ctx.canvas.width, ctx.canvas.height),
                outputCanvasSize: {width:ctx.canvas.width, height:ctx.canvas.height}}
        }
        return {
            data:null,
            outputCanvasSize:{width:0, height:0}
        }
    };

}