const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })  //returns a promise
			 .then(localMediaStream => {
			 	console.log(localMediaStream); 
			 	video.src = window.URL.createObjectURL(localMediaStream); //needs to be converted into a URL
			 	video.play(); 
			 })
			 .catch(error => {
			 	console.error('Error!', error); 
			 });  //for when an error occurs/camera is not allowed access
}
//now to take a single frame from the video and paint it on the canvas
function paintToCanvas() {
	const width = video.videoWidth; 
	const height = video.videoHeight; 
	//console.log(width, height); //we need to make sure the image size is the same as the canvas size or else could cause problems
	canvas.width = width; 
	canvas.height = height; 

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height); //takes a video element and paints to canvas. 
		//CREATE DIFFERENT EFFECTS
		//take the pixels out...
		let pixels = ctx.getImageData(0, 0, width, height);//.data - will return a very large multi-layer array of the pixels and the rgba values(0:r 1:g 2:b 3:a).
		//...mess with them...
		
		//pixels = redEffect(pixels); 

		//pixels = rgbSplit(pixels); 
		//ctx.globalAlpha = 0.1; 

		pixels = greenScreen(pixels); 
		//...put them back.
		ctx.putImageData(pixels, 0, 0); 


	}, 16); //return setInterval, so in case you need to stop painting, you have access to that interval.
}
//
function takePhoto() {
	snap.currentTime = 0; //played sound
	snap.play(); 

	//next, take the datea out of canvas
	const data = canvas.toDataURL('image/jpeg');
	//console.log(data); //returns base 64(text based representation) of the image. Can create a link with this.
	const link = document.createElement('a'); 
	link.href = data; 
	link.setAttribute('download', 'that is you, dipstick'); 
	//link.textContent = 'Download Image'; 
	link.innerHTML = `<img src='${data}' alt='you are soo pretty'></img>`
	strip.insertBefore(link, strip.firstChild); //similar to jQuery's (.prepend), but in vanilla JS.
}
//
function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i+=4) {
		/*
		pixels[i] //r
		pixels[i + 1] //g
		pixels[i + 2] //b
		pixels[i + 3] //a
		*/
		pixels.data[i + 0] = pixels.data[i + 0] + 100;  //red
		pixels.data[i + 1] = pixels.data[i + 1] - 50;  //green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5;  //blue
	}
	return pixels;
}
//
function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i - 150] = pixels.data[i + 0];  //red
		pixels.data[i + 100] = pixels.data[i + 1];  //green
		pixels.data[i - 150] = pixels.data[i + 2];  //blue
	}
	return pixels;
}
//
function greenScreen(pixels) {
	const levels = {}; 

	document.querySelector('.rgb input').forEach(input => {
		levels[input.name] = input.value; 
	})

	for (let i = 0; i < pixels.data.length; i+=4) {
		red = pixels.data[i + 0];  //red
		green = pixels.data[i + 1];  //green
		blue = pixels.data[i + 2];  //blue
		alpha = pixels.data[i + 3]; 

		if (red >= levels.rmin
      		&& green >= levels.gmin
      		&& blue >= levels.bmin
      		&& red <= levels.rmax
      		&& green <= levels.gmax
      		&& blue <= levels.bmax) 
      		// take it out!
      		pixels.data[i + 3] = 0;
	}
	return pixels;
}

getVideo();


video.addEventListener('canplay', paintToCanvas); //
