const triggers = document.querySelectorAll('a'); 
const highlight = document.createElement('span'); 

highlight.classList.add('highlight'); 
document.body.appendChild(highlight); 

function highlightLink() { /*this = thing that was triggered*/
	const linkCoords = this.getBoundingClientRect(); /*tells us (bottom, height, left, right, top, width) where on the page that element lives (gives us coordinates of element) */
	//console.log(linkCoords);
	const coords = { 
		width: linkCoords.width, 
		height: linkCoords.height, 
		top: linkCoords.top + window.scrollY, /*adjustments for when user scrolling*/
		left: linkCoords.left + window.scrollX,
	}; 
	/*applying 'getBoundingClientRect() dimensions/coordinates to the css elements*/
	highlight.style.width = `${coords.width}px`; /*gives us the the width and height of the element and dynamically applies those measurements to the highlight class*/
	highlight.style.height = `${coords.height}px`;
	highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`; /**/
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
