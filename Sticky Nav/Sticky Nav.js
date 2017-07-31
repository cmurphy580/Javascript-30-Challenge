
const nav = document.querySelector('#main'); 
const topOfNav = nav.offsetTop; 

function fixNav() {
	//console.log(topOfNav, window.scrollY); 
	if (window.scrollY >= topOfNav) { //add a class to the body instead of the specific element, that way it easier to target any of the children elements 
		document.body.style.paddingTop = nav.offsetHeight + 'px'; 
		document.body.classList.add('fixed-nav'); 
	} else {
		document.body.style.paddingTop = 0; 
		document.body.classList.remove('fixed-nav'); 
	}

}

window.addEventListener('scroll', fixNav); 


