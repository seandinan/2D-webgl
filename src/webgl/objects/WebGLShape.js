import PROGRAM from '../constants/programClass';
import WebGLObject from './WebGLObject';

class WebGLShape extends WebGLObject {
	constructor(webglCanvas){
		super(PROGRAM.SHAPE, webglCanvas);
	}
}

export default WebGLShape;
