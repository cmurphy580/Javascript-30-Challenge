const hero = document.querySelector('.hero'); 
const text = hero.querySelector('h1'); 
//tap into acelerometer to do the same in phone?
const walk = 100; //100px -50 is as low you can go 50px is as high as you can go. 

function shadow (event) {
	//console.log(event); 
	//get the width and length of the div element
		//const width = hero.offsetWidth; 
		//const height = hero.offsetHeight;
	//use ES6 destructuring;  
	const { offsetWidth: width, offsetHeight: height } = hero; 
	let { offsetX: x, offsetY: y } = event; 
	//console.log(x, y); gives you coordinates of the mouse on the screen. If there are child elements on the screen it will give us new coordinates (0,0) when the mouse scrolls over the element.
	//to fix this we use the offsetLeft and offsetTop within the conditional below.  
	//console.log(this, event.target); //depending on where you are scrolling...this === hero, but the target is equal to h1
	if (this !== event.target) {
		x = x + event.target.offsetLeft; 
		y = y + event.target.offsetTop; 
	}
	//need the top-left corner to be negative (min, ie. -50px) and the bottom-right to be positive (max, ie. 50px).
	const xWalk = Math.round((x / width * walk) - (walk / 2)); 
	const yWalk = Math.round((y / height * walk) - (walk / 2)); 
	console.log(xWalk, yWalk); 
	text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7)`; 
							/*
						 	${xWalk * -1}px ${yWalk}px 0 rgba(0, 255, 255, 0.7), 
						 	${yWalk}px ${xWalk * -1}px 0 rgba(255, 0, 0, 0.7), 
						 	${yWalk * -1}px ${xWalk}px 0 rgba(0, 0, 255, 0.7)`;
							*/
}

hero.addEventListener('mousemove', shadow)