const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(bandName) {
	const regex = /^[A /An /The ]/i; 
	return bandName.replace(regex, '').trim();  
}

const sortedBands = bands.sort((a,b) => strip(a) > strip(b) ? 1 : -1) 
//console.log(sortedBands)

document.querySelector('#bands').innerHTML = sortedBands.map(band => `<li>${band}</li>`).join(''); 

