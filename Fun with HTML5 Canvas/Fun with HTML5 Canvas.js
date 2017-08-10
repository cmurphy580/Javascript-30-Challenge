const canvas = document.querySelector('.canvas'); 
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

ctx.strokeStyle = 'blue'; 
ctx.lineJoin = 'round'; //where a line meets a line
ctx.lineCap = 'round'; 	//end of line
ctx.globalCompositeOperation = 'multiply'; /*bonus feature*/

let isDrawing = false; //flag for when 'mousedown' eventListener
let lastX = 0;
let lastY = 0; 
let hue = 0; 
let direction = true; 

function draw(event) {
	if (!isDrawing) return; //stop when not drawing
	
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(event.offsetX, event.offsetY)
	ctx.stroke(); 
	//lastX = event.offsetX; 
	//lastY = event.offsetY; //destructure into array
	[lastX, lastY] = [event.offsetX, event.offsetY];

	hue++; 
	if (hue >= 360) //not necessary
		hue = 0; 

	if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1)
		direction = !direction 
	if (direction)
		ctx.lineWidth++; 
	else 
		ctx.lineWidth--;


}
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousedown', (event) => {
	isDrawing = true;
	[lastX, lastY] = [event.offsetX, event.offsetY];
});
canvas.addEventListener('mousemove', draw); 
