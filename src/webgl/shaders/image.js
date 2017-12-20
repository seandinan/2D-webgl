export const IMAGE_VERTEX_SHADER_2D = `
  attribute vec2 a_position;
	attribute vec2 a_texCoord;
	
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;

  void main() {
    // Convert from clipspace to pixel placement
    vec2 clipSpace = ( 2.0 * a_position / u_resolution ) - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
    v_texCoord = a_texCoord; // Pass texCoord to frag shader
  }
`;

export const IMAGE_FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform float u_brightness;
  uniform float u_contrast;
  uniform vec4 u_color;
  uniform sampler2D u_image;
  
  varying vec2 v_texCoord;

  void main() {
	  // gl_FragColor = u_color;
	  // gl_FragColor = texture2D(u_image, v_texCoord);
	  
	  vec4 color = texture2D(u_image, v_texCoord);
	  
	  // Brightness & Contrast inspired by https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/brightnesscontrast.js
	  // Set the brightness
		color.rgb += u_brightness;
		
		// Set the contrast
		if (u_contrast > 0.0){
			color.rgb = (color.rgb - 0.5) / (1.0 - u_contrast) + 0.5;
		} else {
			color.rgb = (color.rgb - 0.5) * (1.0 + u_contrast) + 0.5;
		}
		
		gl_FragColor = color;
		
  }
`;
