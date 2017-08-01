const divs = document.querySelectorAll('div'); 
const button = document.querySelector('button'); 

function logText(event) {
	console.log(this.classList.value); 
	//event.stopPropogation();  //will stop the bubbling up/capture events from occurring (will log the element clicked on, nothing else)
	//console.log(this); 
}
//divs.forEach(div => div.addEventListener('click', logText)) //when you click on the 'three' div, the function will log all the 'three two one' divs //this concept is called 'bubbling'
//capture = goes from top(most outer) down(most inner), then bubbles it way out and logs the values from the bubbling process
//if capture is set to true, the function will log the values from top down, and prevent the bubbling process.
if
divs.forEach(div => div.addEventListener('click', logText, {
	capture: false,
	once: true //listens for an event once and then unbinds itself
})); 

button.addEventListener('click', () => {
	console.log('Clicked!') 
}, {
	once: true //performs the action only once
});