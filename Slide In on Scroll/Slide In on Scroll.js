//got from internet - reduces the number of occurences for eventlisteners
//'wait = 20' - will run this function at most every 20(ms)
//there is a 'debounce' method in lodash. 
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  //console.log(event);

  //window.scrollY - tells us how much we have scrolled down from the top of our browser. 
    //to get the bottom of the screen we add 'window.innerHeight' 
    //want the image to slide in when we have scrolled to half it's height on the page, so we subtract -(sliderImage.height/2).
  //When we scroll past the image we want the picture to fade out.
    //So when we scroll up, we want to know where the bottom of the picture is, to that we use 'sliderImage.offsetTop',
    //which tells how far the top of the image is from the top of the window, 
    //and add +'sliderImage.height' to get the bottom.  
  sliderImages.forEach(sliderImage => {
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2; 
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop; //indicates when the image should slide in.  
    const isNotScrolledPast = window.scrollY < imageBottom; //checks to see if we have scrolled past, because if we have we need to fade the image out. 
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active'); 
    } else {
      sliderImage.classList.remove('active'); 
    }
  });

}

window.addEventListener('scroll', debounce(checkSlide)); 