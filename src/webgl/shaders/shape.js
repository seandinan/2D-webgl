export const SHAPE_VERTEX_SHADER_2D = `
  attribute vec2 a_position;
	
	uniform vec2 u_resolution;
	
  void main() {
    // Convert from clipspace to pixel placement
    vec2 clipSpace = ( 2.0 * a_position / u_resolution ) - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
  }
`;

export const SHAPE_FRAGMENT_SHADER = `
  precision highp float;
  
  uniform vec4 u_color;
  
  void main() {
	  gl_FragColor = u_color;
  }
`;
