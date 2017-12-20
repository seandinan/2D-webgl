import PROGRAM from '../constants/programClass';
import WebGLObject from './WebGLObject';

function WebGLShape(webglCanvas){
	const glShape = new WebGLObject(PROGRAM.SHAPE, webglCanvas);
	return glShape;
}

export default WebGLShape;
