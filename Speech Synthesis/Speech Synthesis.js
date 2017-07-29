const msg = new SpeechSynthesisUtterance(); //speech synthesis api
let voices = []; 
const voicesDropDown = document.querySelector('[name="voice"]'); 
const options = document.querySelectorAll('[type="range"], [name="text"]'); 
const speakButton = document.querySelector('#speak'); 
const stopButton = document.querySelector('#stop'); 

msg.text = document.querySelector('[name="text"]').value; 
//SpeechSynthesisUtterance v SpeechSynthesis(has eventlistener = 'voiceschanged')

function populateVoices() {
	voices = this.getVoices(); 
	//console.log(voices); 
	voicesDropDown.innerHTML = voices
		.filter(voice => voice.lang.includes('en')) 
		.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
		.join(''); 
}

function setVoice() {
	//console.log(this.value); 
	msg.voice = voices.find(voice => voice.name === this.value); 
	toggle(); 
}

function toggle(startOver = true) { //make a function that restarts everytime a language is changed
	speechSynthesis.cancel(); 
	if (startOver) //flag and conditional are used to make sure it stops
		speechSynthesis.speak(msg);  
}

function setOption() {
	//console.log(this.name, this.value); 
	msg[this.name] = this.value; 
	toggle(); 
}

speechSynthesis.addEventListener('voiceschanged', populateVoices); 
voicesDropDown.addEventListener('change', setVoice); 
options.forEach(option => option.addEventListener('change', setOption)); 
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', () => toggle(false)); //or you can use 'toggle.bind(null, false)'













