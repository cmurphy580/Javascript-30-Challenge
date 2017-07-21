const timeNodes = [...document.querySelectorAll('[data-time]')]; 
//convert the above into an array of all the times


const seconds = timeNodes
					.map(node => node.dataset.time)
					.map(timeCode => {
						const [min, sec] = timeCode.split(':').map(parseFloat); 
						return (min * 60) + sec; 
					})
					.reduce((total, sec) => total + sec);
					
let secondsLeft = seconds;

const hours = Math.floor(secondsLeft / 3600); 
secondsLeft = secondsLeft % 3600; 

const minutes = Math.floor(secondsLeft / 60); 
secondsLeft = secondsLeft % 60; 

console.log(hours, minutes, secondsLeft); 




