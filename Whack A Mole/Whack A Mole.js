const holes = document.querySelectorAll('.hole');
const scoreboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole'); 

let lastHole; 
let timeup = false; 
let score = 0; 

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min); 
}
function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length); 
	const hole = holes[idx]; 
	if (hole === lastHole) {
		console.log('Same hole dude');
    	return randomHole(holes);
	}
	lastHole = hole; 
	return hole; 
}
function peep() {
	const time = randomTime(1000, 2000); 
	const hole = randomHole(holes); 
	hole.classList.add('up'); 
	setTimeout(() => {
		hole.classList.remove('up'); 
		if (!timeUp) peep(); 
	}, time); 
}
function startGame() {
	scoreboard.textContent = 0; 
	timeUp = false; 
	score = 0; 
	peep(); 
	setTimeout(() => timeUp = true, 20000) //length of a startGame
}
function bonk(event) {
	if(!event.isTrusted) return; //cheater
	score++; 
	this.parentNode.classList.remove('up');
	scoreboard.textContent = score; 
}

moles.forEach(mole => mole.addEventListener('click', bonk)); 

/**/
var dots = [];
  for (var i = 0; i < 1; i++) {
    var node = document.createElement("div");
    node.className = "trail";
    document.body.appendChild(node);
    dots.push(node);
  }
  var currentDot = 0;
  
  addEventListener("mousemove", function(event) {
    var dot = dots[currentDot];
    dot.style.left = (event.pageX - 3) + "px";
    dot.style.top = (event.pageY - 3) + "px";
    currentDot = (currentDot + 1) % dots.length;
  });