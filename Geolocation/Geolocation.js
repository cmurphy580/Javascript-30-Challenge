const arrow = document.querySelector('.arrow'); 
const speed = document.querySelector('.speed-value'); 

//watchPosition - (get frequent updates) vs getPosition - (gives us the one location)
navigator.geolocation.watchPosition((data) => {
	//console.log(data); 
	//convert from kmh to mph -
	speed.textContent = Math.round(data.coords.speed * 0.6214); 

	arrow.style.transform = `rotate(${data.coords.heading}deg)`

	//run a error function in case user does not give permission to receive their location 
}, (error) => {
	console.log(error); 
	alert('In order for the app to work we need your location.')
}); 
