import PROGRAM from './constants/programClass';
import { generateUUID } from './utils/generateUUID';

class WebGLCanvas {
	constructor(domCanvas){
		const gl = domCanvas.getContext("webgl");
		if (!gl) throw new Error('WebGL not detected');

		this.id = generateUUID();
		this.context = gl;
		this.canvas = domCanvas;
		this.height = domCanvas.height;
		this.width = domCanvas.width;
		this.programs = {}; // Caches programs that are used by multiple objects
		this.objects = [];
	}

	createProgram = (programClass, vertexShader, fragmentShader) => {
		const gl = this.context;
		const program = gl.createProgram();
		gl.attachShader(program, createShader(gl, vertexShader, gl.VERTEX_SHADER));
		gl.attachShader(program, createShader(gl, fragmentShader, gl.FRAGMENT_SHADER));
		gl.linkProgram(program);
		const success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!success){
			console.error(`Error linking program: ${gl.getProgramInfoLog(program)}`);
			return gl.deleteProgram(program);
		}
		let locations = {};

		if (programClass === PROGRAM.IMAGE){
			locations = {
				attribute: {
					position: gl.getAttribLocation(program, "a_position"),
					texCoord: gl.getAttribLocation(program, 'a_texCoord'),
				},
				uniform: {
					resolution: gl.getUniformLocation(program, "u_resolution"),
					color:      gl.getUniformLocation(program, "u_color"),
					brightness: gl.getUniformLocation(program, 'u_brightness'),
					contrast:   gl.getUniformLocation(program, 'u_contrast'),
				},
			}
		} else if (programClass === PROGRAM.SHAPE){
			locations = {
				attribute: {
					position:   gl.getAttribLocation(program, "a_position"),
				},
				uniform: {
					resolution: gl.getUniformLocation(program, "u_resolution"),
					color:      gl.getUniformLocation(program, "u_color"),
				},
			}
		} else throw new Error(`Unrecognized program class: ${programClass}`);

		// Add to overarching programs container
		this.programs[programClass] = { program, locations };
		return this.programs[programClass];
	}

	resetCanvas = () => {
		this.setCanvasSize(this.canvas.width, this.canvas.height);
		this.clearCanvas();
	};

	setCanvasSize = (width, height) => {
		this.width = width;
		this.height = height;
		this.canvas.width = width;
		this.canvas.height = height;
		this.context.viewport(0, 0, width, height);
	}

	clearCanvas = () => {
		this.context.clearColor(0, 0, 0, 0);
		this.context.clear(this.context.COLOR_BUFFER_BIT);
	};

	add = (obj) => this.objects.push(obj);

	remove = (obj) => this.objects = this.objects.filter(o => o.id !== obj.id);

	render = () => {
		this.clearCanvas();
		this.objects.forEach(object => { object.render() });
	}
}

function createShader(gl, shaderSource, shaderType){
	const shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);
	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!success){
		console.error(`Error loading shader: ${gl.getShaderInfoLog(shader)}`);
		return gl.deleteShader(shader);
	}
	return shader;
}

export default WebGLCanvas;
