import WebGLShape from './WebGLShape';
import { setRectangle } from './../utils/setShapes';

class WebGLRect extends WebGLShape {
	constructor(webglCanvas, options = {}){
		super(webglCanvas);
		this.position = { x: options.x || 0, y: options.y || 0 };
		this.height   = options.height || 100;
		this.width    = options.width || 100;

		this.color = [ Math.random(), Math.random(), Math.random() ];
	}

	render = () => {
		const gl = this.context;
		const { program, locations } = this.program;

		var positionBuffer = gl.createBuffer(); // Create buffer for three 2D clip space points

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Bind ARRAY_BUFFER to positionBuffer;

		setRectangle(gl, this.position, this.width, this.height);

		gl.useProgram(program); // Set to current program

		gl.uniform2f(locations.uniform.resolution, gl.canvas.width, gl.canvas.height);

		// set the color

		// gl.uniform4f(locations.uniform.color, color1, color2, color3, 1);
		gl.uniform4f(locations.uniform.color, this.color[0], this.color[1], this.color[2], 1);

		// Turn on the position attribute
		gl.enableVertexAttribArray(locations.attribute.position);

		// Bind the position buffer.
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size      = 2;          // 2 components per iteration
		var type      = gl.FLOAT;   // the data is 32bit floats
		var normalize = false;      // don't normalize the data
		var stride    = 0;          // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset    = 0;          // start at the beginning of the buffer
		gl.vertexAttribPointer(locations.attribute.position, size, type, normalize, stride, offset)


		var primitiveType = gl.TRIANGLES;
		var offset = 0;
		var count = 6;
		gl.drawArrays(primitiveType, offset, count);

	};
}

export default WebGLRect;
