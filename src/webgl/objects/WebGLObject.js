import PROGRAM from '../constants/programClass';
import { IMAGE_FRAGMENT_SHADER, IMAGE_VERTEX_SHADER_2D } from '../shaders/image';
import { SHAPE_FRAGMENT_SHADER, SHAPE_VERTEX_SHADER_2D } from '../shaders/shape';
import { generateUUID } from '../utils/generateUUID';

function WebGLObject(objectClass, webglCanvas){
	this.id = generateUUID();
	this.class = objectClass;
	this.context = webglCanvas.context;
	this.brightness = 0;
	this.contrast = 0;
	this.height = 0;
	this.width = 0;
	this.color = [ 0, 0, 0 ];
	this.position = {
		x: 0,
		y: 0,
	}

	if (!webglCanvas.programs[objectClass]){
		if (objectClass === PROGRAM.IMAGE){
			webglCanvas.createProgram(objectClass, IMAGE_VERTEX_SHADER_2D, IMAGE_FRAGMENT_SHADER);
		} else if (objectClass === PROGRAM.SHAPE){
			webglCanvas.createProgram(objectClass, SHAPE_VERTEX_SHADER_2D, SHAPE_FRAGMENT_SHADER);
		}
	}

	this.program = webglCanvas.programs[objectClass];

	this.setBrightness = (programObject) => {
		this.context.uniform1f(programObject.locations.uniform.brightness, Math.round(this.brightness * 1000) / 1000);
	}

	this.setContrast = (programObject) => {
		this.context.uniform1f(programObject.locations.uniform.contrast, Math.round(this.contrast * 1000) / 1000);
	}

	this.render = () => {
		return null;
	}
}

export default WebGLObject;
