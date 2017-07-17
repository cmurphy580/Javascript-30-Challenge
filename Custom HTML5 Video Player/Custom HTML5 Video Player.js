/*target elements*/
const player = document.querySelector('.player'); 
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress'); 
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');

/*build functions*/
function togglePlay() {
  /*
  if (video.paused)
    video.play();
  else 
    video.pause(); 
  */
  const method = video.paused ? 'play' : 'pause';
  video[method](); 
}
function updateButton() { 
  const icon = this.paused ? '►' : '❚ ❚'; //this = this is bound to video
  toggle.textContent = icon;
}
function skip() {
  video.currentTime += +(this.dataset.skip); //removed 'parseFloat()'
}
const speakerIcon = player.querySelector('#speaker_icon');
function handleRangeUpdate() {
  /*
  console.log(this.name);
  console.log(this.value);
  */
  video[this.name] = this.value; 
  (video['volume'] === 0 ? speakerIcon.className = "fa fa-volume-off" : 
                           speakerIcon.className = "fa fa-volume-up")
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100; 
  progressBar.style.flexBasis = `${percent}%`;
}
/*use this function above for the volume and speed bars*/
function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration; 
  video.currentTime = scrubTime; 
}

/*functions linked to elements*/
video.addEventListener('click', togglePlay);
video.addEventListener('keydown', (event) => event.keyCode === 32 && togglePlay()); //{if (event.keyCode === 32) togglePlay()}) /*spacebar to pause, only works when play button is pushed*/
video.addEventListener('play', updateButton); /*use updateButton for resize screen*/
video.addEventListener('pause', updateButton); 
video.addEventListener('timeupdate', handleProgress); 

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); 
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); 

let mouseDown = false; 
progress.addEventListener('click', scrub); 
progress.addEventListener('mousemove', (event) => mouseDown && scrub(event)); 
progress.addEventListener('mousedown', () => mouseDown = true); 
progress.addEventListener('mouseup', () => mouseDown = false); 

/*additional*/

/*fullscreen = https://www.jwplayer.com/blog/using-the-browsers-new-html5-fullscreen-capabilities/*/
const screen_size = player.querySelector('.screenSize');
const controls = player.querySelector('.player_controls'); 
const screenSize_icon = player.querySelector('#screenSize_icon'); 

  function changeScreenSize() {
    if (player.mozRequestFullScreen) {
      // This is how to go into fullscren mode in Firefox
      // Note the "moz" prefix, which is short for Mozilla.
      player.mozRequestFullScreen();
      //change icon
      screenSize_icon.className = "fa fa-compress"; 
      /*control panel once fullscreen*/
      video.addEventListener('mouseout', () => controls.style.transform = 'translateY(100%) translateX(-5px)'); 
      video.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      controls.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      screen_size.addEventListener('click', () =>  { 
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            screenSize_icon.className = "fa fa-expand";
        }
      }); 
    } else if (player.webkitRequestFullScreen) {
      // This is how to go into fullscreen mode in Chrome and Safari
      // Both of those browsers are based on the Webkit project, hence the same prefix.
      player.webkitRequestFullScreen();
      //change icon 
      screenSize_icon.className = "fa fa-compress"; 
      /*control panel once fullscreen*/
      video.addEventListener('mouseout', () => controls.style.transform = 'translateY(100%) translateX(-5px)'); 
      video.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      controls.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      screen_size.addEventListener('click', () =>  { 
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            screenSize_icon.className = "fa fa-expand"; 
        }
      }); 
   }
  }
screen_size.addEventListener('click', changeScreenSize); 
/**/

/* MUTE button */
const speaker = player.querySelector('.speaker'); 
const volInput = player.querySelector('input[name="volume"]')
//const speakerIcon = player.querySelector('#speaker_icon'); 

let muted = false;

function mute() {
  if (!muted) {
    video['volume'] = 0;
    volInput.value = 0;
    speakerIcon.className = "fa fa-volume-off"
    muted = true; 
  } else {
    video['volume'] = 1;
    volInput.value = 1;
    muted = false;
    speakerIcon.className = "fa fa-volume-up"
  }
}

speaker.addEventListener('click', mute)
/**/

/*play rate button*/
const rate_icon = player.querySelector('.rate_icon')
const rateInput = player.querySelector('input[name="playbackRate"]')
let rateChanged = false; 

function changeRate() {
  if (!rateChanged) {
    video['playbackRate'] = 0.5;
    rateInput.value = 0.5;
    rateChanged = true; 
  } else {
    video['playbackRate'] = 1;
    rateInput.value = 1;
    rateChanged = false;
  }
}

rate_icon.addEventListener('click', changeRate)
/**/



