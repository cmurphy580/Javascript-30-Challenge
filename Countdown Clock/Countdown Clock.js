let countdown; //could put this variable in an IIFE to keep out of the global namespace

const timerDisplay = document.querySelector('.display_time-left'); 
const endTime = document.querySelector('.display_end-time'); 
const buttons = document.querySelectorAll('[data-time]'); 

function timer(seconds) {
	//clear any existing timers 
	clearInterval(countdown)

	const now = Date.now(); //instead of '(new Date()).getTime();'
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000); 
		//console.log(secondsLeft);
		//check to see if we should stop it 
		if (secondsLeft < 0) {
			clearInterval(countdown)
			return; 
		}
		//display it
		displayTimeLeft(secondsLeft); 
	}, 1000);
}

function displayTimeLeft(seconds) {
	//console.log(seconds);
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60; 
	//console.log({ minutes, remainderSeconds }); 
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; 
	document.title = display;  // title tag in html, tab on the browser
	timerDisplay.textContent = display; //timerDisplay = div element.  
}

function displayEndTime(timestamp) { //timestamp = 'then' time variable
	const end = new Date(timestamp); /*create a new Date object from the timestamp*/
	const hour = end.getHours();
	const am_pm = hour > 12 ? 'PM' : 'AM'; 
	const adjustedHour = hour > 12 ? hour - 12 : hour; 
	const minutes = end.getMinutes(); 
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${am_pm}`;
}

function startTimer() {
	const seconds = +(this.dataset.time); 
	timer(seconds); 
}

buttons.forEach(button => button.addEventListener('click', startTimer)); 
document.customForm.addEventListener('submit', function(event) {
	event.preventDefault(); //to stop the page from reloading and stop it from running a get
	const mins = this.minutes.value; 
	console.log(mins); 
	timer(mins * 60); //timer takes seconds not minutes. 
	this.reset(); //clear the value in the input once we logged it.
}); 













