import React from 'react';
import WebGLCanvas from './../webgl/WebGLCanvas';
import WebGLImage from './../webgl/objects/WebGLImage';
import WebGLRect from './../webgl/objects/WebGLRect';

class ViewerPage extends React.Component {
  constructor(props){
    super(props);
    this.canvas;
    this.webGLCanvas;
    this.state = {
    	brightness: 0.0,
	    contrast: 0.0,
    };
  }

  raycast = (mouse, objects = this.webGLCanvas.objects) => {
		return objects.filter(object => {
			const { x, y } = object.position;
			return (
				mouse.x >= x && mouse.x <= x + object.width &&
				mouse.y >= y && mouse.y <= y + object.height
			)
		})
  }

  handleMouseDown = (e) => {
	  let squares = this.webGLCanvas.objects.filter(o => o.class === 'SHAPE');
	  let mouse = { x: e.pageX - this.canvas.offsetLeft, y: e.pageY - this.canvas.offsetTop };
  	let square = this.raycast(mouse, squares);
  	if (square.length > 0) this.setState({ activeShapeID: square[square.length - 1].id });
  	e.preventDefault();
  	this.setState({ lastX: e.pageX, lastY: e.pageY });
  	window.addEventListener('mousemove', this.handleMouseMove);
  	window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = (e) => {
  	e.preventDefault();
  	this.setState({ activeShapeID: null });
	  window.removeEventListener('mousemove', this.handleMouseMove);
	  window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove = (e) => {
		e.preventDefault();
		const { lastX, lastY } = this.state;
		const box = this.webGLCanvas.objects.filter(o => o.id === this.state.activeShapeID)[0];
		if (box){
			box.position = {
				x: box.position.x + ( e.pageX - lastX ),
				y: box.position.y + ( e.pageY - lastY ),
			}
		}
		this.webGLCanvas.render();
		this.setState({ lastX: e.pageX, lastY: e.pageY });
  }

  componentDidMount(){
	  this.webGLCanvas = new WebGLCanvas(this.canvas);
	  this.webGLCanvas.setCanvasSize(500, 500);
	  this.addSquare(Math.random() * 500, Math.random() * 500);
	  const image = document.createElement('img');
	  image.onload = () => {
		  this.canvas.width = image.width;
		  this.canvas.height = image.height;
		  let img = new WebGLImage(image, this.webGLCanvas);
		  this.webGLCanvas.setCanvasSize(image.width, image.height);
		  this.webGLCanvas.add(img);
		  this.webGLCanvas.render();
		  for (var i = 0; i < 5; i++){
			  this.addSquare(Math.random() * image.width, Math.random() * image.height);
		  }
	  }
	  image.src = 'http://localhost:3000/public/assets/oh_no.png';
  }

	addSquare = (x, y) => {
		const square = new WebGLRect(this.webGLCanvas);
		square.position = { x, y };
		square.height = x;
		square.width = y;
		this.webGLCanvas.add(square);
		this.webGLCanvas.render();
	};

  render(){
    return (
      <canvas
	      onMouseDown={this.handleMouseDown}
	      ref={ref => this.canvas = ref}/>
    )
  }
}

ViewerPage.defaultProps = {};

ViewerPage.propTypes = {};

export default ViewerPage;
