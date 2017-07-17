//KONAMI CODE
const pressed = []; 
const code = 'cheese'; 


const title = document.querySelector('span'); 
const sub = document.querySelector('h1'); 
const background = document.querySelector('body'); 


window.addEventListener('keyup', (event) => {
	console.log(event.key)
	pressed.push(event.key);
	pressed.splice(-code.length - 1, pressed.length - code.length); 
	if (pressed.join('').includes(code)) {
		console.log('DING! DING! YOU DID IT!!'); 
		title.style.display = 'none'; 
		sub.style.display = 'none'; 
		background.style.background = 'yellow'; 
		cornify_add(); 
	}


})