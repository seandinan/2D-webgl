import PROGRAM from './constants/programClass';
import { generateUUID } from './utils/generateUUID';

function WebGLCanvas(domCanvas){
	const gl = domCanvas.getContext("webgl");
	if (!gl) throw new Error('WebGL not detected');

	this.id = generateUUID();
	this.context = gl;
	this.canvas = domCanvas;
	this.programs = {}; // Caches programs that are used by multiple objects
	this.objects = [];

	this.createProgram = (programClass, vertexShader, fragmentShader) => {
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

	this.resetCanvas = () => {
		this.setCanvasSize(this.canvas.width, this.canvas.height);
		this.clearCanvas();
	};

	this.setCanvasSize = (width, height) => gl.viewport(0, 0, width, height);

	this.clearCanvas = () => {
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	};

	this.add = (obj) => this.objects.push(obj);

	this.remove = (obj) => this.objects = this.objects.filter(o => o.id !== obj.id);

	this.render = () => {
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
