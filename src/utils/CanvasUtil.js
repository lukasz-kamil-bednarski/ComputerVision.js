export default class DrawUtil {

    getMousePos = (canvas, event) =>{
        let rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

}