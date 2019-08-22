import getCanvasSize from "./CanvasSizeUtli";

export default class DrawUtil {

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

    static drawRawImageToCanvas(rawImage){

    }

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
            let width;
            let height;
            let drawWidth;
            let drawHeight;
            const size = getCanvasSize();
            width = size.width;
            height= size.height;

            ctx.canvas.width = width;
            ctx.canvas.height = height; //restoring default values
            ctx.clearRect(0, 0, width, height);

            if (imgWidth < width && imgHeight < height) {
                ctx.canvas.width = imgWidth;
                ctx.canvas.height = imgHeight;
                drawWidth = imgWidth;
                drawHeight = imgHeight

            }else if(imgWidth >= width && imgHeight < height){
                 aspectRatio = width / imgWidth;
                 drawWidth = imgWidth * aspectRatio;
                 drawHeight = imgHeight * aspectRatio;
            }else if(imgWidth < width && imgHeight >= height){
                aspectRatio = height / imgHeight;
                drawHeight = imgHeight * aspectRatio;
                drawWidth = imgWidth;

            }else if(imgWidth >= width && imgHeight >= height){
                let aspectRatioWidth = width / imgWidth;
                let aspectRatioHeight = height / imgHeight;
                drawWidth =  aspectRatioWidth * imgWidth;
                drawHeight = aspectRatioHeight * imgHeight;
            }
            ctx.canvas.width = drawWidth;
            ctx.canvas.height = drawHeight;
            ctx.drawImage(image, 0, 0, drawWidth, drawHeight);

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