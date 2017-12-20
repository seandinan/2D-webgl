export function setRectangle(gl, position, width, height){
	// Set the active buffer w/ values that define a rectangle
	const x1 = position.x;
	const x2 = position.x + width;
	const y1 = position.y;
	const y2 = position.y + height;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		x1, y1,
		x2, y1,
		x1, y2,
		x1, y2,
		x2, y1,
		x2, y2,
	]), gl.STATIC_DRAW);
}
