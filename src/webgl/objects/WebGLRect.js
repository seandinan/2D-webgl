import WebGLShape from './WebGLShape';
import { setRectangle } from './../utils/setShapes';

function WebGLRect(webglCanvas, options = {}){
	const glRect = new WebGLShape(webglCanvas);
	const { program, locations } = glRect.program;
	const gl = glRect.context;

	glRect.position = { x: options.x || 0, y: options.y || 0 };
	glRect.height = options.height || 100;
	glRect.width  = options.width || 100;

	// let color1 = 0.1504696029406818;
	// let color2 =0.4187331927393345;
	// let color3 = 0.4661974725816853;
	glRect.color = [ Math.random(), Math.random(), Math.random() ];

	glRect.render = () => {

		var positionBuffer = gl.createBuffer(); // Create buffer for three 2D clip space points

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Bind ARRAY_BUFFER to positionBuffer;

		setRectangle(gl, glRect.position, glRect.width, glRect.height);

		gl.useProgram(program); // Set to current program

		// set the resolution
		gl.uniform2f(locations.uniform.resolution, webglCanvas.canvas.width, webglCanvas.canvas.height);

		// set the color

		// gl.uniform4f(locations.uniform.color, color1, color2, color3, 1);
		gl.uniform4f(locations.uniform.color, glRect.color[0], glRect.color[1], glRect.color[2], 1);

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

	return glRect;
}

export default WebGLRect;
