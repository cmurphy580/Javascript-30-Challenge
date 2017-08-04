const slider = document.querySelector('.items'); 
let isDown = false; 
let startX; 
let scrollLeft; 

slider.addEventListener('mousedown', (event) => {
	isDown = true; 
	slider.classList.add('active'); 
	//console.log(event); 
	startX = event.pageX - slider.offsetLeft; /*event.pageX tells us where on the screen we clicked. the slider.offsetLeft will adjust the position value in the case there is any margin or padding*/
	scrollLeft = slider.scrollLeft; /*tells us how far (left/right) we have scrolled. Used in later function.*/
	console.log(scrollLeft)
});

slider.addEventListener('mouseleave', () => {
	isDown = false; 
	slider.classList.remove('active'); 
}); 

slider.addEventListener('mouseup', () => {
	isDown = false; 
	slider.classList.remove('active'); 
}); 

slider.addEventListener('mousemove', (event) => {
	if (!isDown) return; 
	event.preventDefault(); 
	const x = event.pageX - slider.offsetLeft; //tells us where the cursor is when they move to the left or the right. Same code as above. Need it to recalculate the position everytime we move the mouse. 
	//console.log({ x, startX }); //x is changing, startX is not changing. 
	const walk = (x - startX) * 4; //how far we have deviated from that initial point. Multiply by three to speed up the scroll over effect.
	slider.scrollLeft = scrollLeft - walk; 
}); 