import PROGRAM from '../constants/programClass';
import WebGLObject from './WebGLObject';
import { setRectangle } from './../utils/setShapes';

function WebGLImage(image, webglCanvas){

	const glImage = new WebGLObject(PROGRAM.IMAGE, webglCanvas);

	glImage.width  = image.width;
	glImage.height = image.height;

	const gl = glImage.context;

	glImage.render = () => {
		const { program, locations } = glImage.program;

		var positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		setRectangle(gl, glImage.position, glImage.width, glImage.height);

		gl.useProgram(program);

		glImage.setBrightness(webglCanvas.programs[PROGRAM.IMAGE]);
		glImage.setContrast(webglCanvas.programs[PROGRAM.IMAGE]);

		gl.uniform2f(locations.uniform.resolution, webglCanvas.canvas.width, webglCanvas.canvas.height);

		gl.enableVertexAttribArray(locations.attribute.position);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size      = 2;          // 2 components per iteration
		var type      = gl.FLOAT;   // the data is 32bit floats
		var normalize = false;      // don't normalize the data
		var stride    = 0;          // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset    = 0;          // start at the beginning of the buffer
		gl.vertexAttribPointer(locations.attribute.position, size, type, normalize, stride, offset)

		var texCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			0.0, 1.0,
			1.0, 0.0,
			1.0, 1.0,
		]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(locations.attribute.texCoord);
		gl.vertexAttribPointer(locations.attribute.texCoord, 2, gl.FLOAT, false, 0, 0);

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		gl.enableVertexAttribArray(locations.attribute.texCoord);
		gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

		var size = 2;
		var type = gl.FLOAT;
		var normalize = false;
		var stride = 0;
		var offset = 0;
		gl.vertexAttribPointer(locations.attribute.texCoord, size, type, normalize, stride, offset);


		var primitiveType = gl.TRIANGLES;
		var offset = 0;
		var count = 6;
		gl.drawArrays(primitiveType, offset, count);

	}

	return glImage;
}

export default WebGLImage;
