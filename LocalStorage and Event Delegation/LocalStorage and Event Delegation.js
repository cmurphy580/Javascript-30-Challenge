//persisting our state with local storage
//event delegation
const addItems = document.querySelector('.add_items'); 
const itemsList = document.querySelector('.tasks'); 
let items = JSON.parse(localStorage.getItem('items')) || []; //creating an array of objects - item and status //Convert the local storage string into an array of objects/ items. if it is not there, it will fall back to an empty array
const reset = document.querySelector('[name="reset"]'); 
const inputItem = document.querySelector('[name="item"]'); //created because this.reset was not working

function addItem(event) {
	event.preventDefault(); //keeps the page from refreshing - keeps info stored in console
	const text = (this.querySelector('[name=item]')).value
	//can use 'document.querySelector()', but use instead, 'this', which is === to the form, because dont want to select at the global level when we can narrow down our search 
	//'text' will give up an input and inputs have a value method.
 
	const item = {
		//text: text, == can use shorthand for this aspect of the object (ES6)
		text, 
		done: false, 
		time: Date.now()
	}
	items.push(item); //every time we push an item to the array, 
	populateList(items, itemsList); // this function will run which will create a list item and populate list.
	localStorage.setItem('items', JSON.stringify(items)); //set the 'items' array to local storage.first param is the key. the second is the object that needs to converted into a string so it is readable
	inputItem.value = ''; //this.reset() ...doesn't work 'type error: not a function'??//clear the input. Remember 'this' is the form element and form elements have a reset method.
}

function populateList(tasks = [], tasksList) {  //set the array parameter equal to an empty array(items/tasks), in case you forget to pass something(default parameter) 
	tasksList.innerHTML = tasks.map((task, i) => {
		if (task.done) {
			return `
		<li>
			<input type="checkbox" data-index=${i} id="item${i}" ${'checked'}><i class="${'fa fa-check-square'}" aria-hidden="true"></i></input>
			<label for="item${i}"> ${task.text} <p>${task.time}</p></label>
		</li>
		`;
		} else {
			return `
		<li>
			<input type="checkbox" data-index=${i} id="item${i}" ${''}><i class="${'fa fa-minus-square-o'}" aria-hidden="true"></i></input>
			<label for="item${i}"> ${task.text}</label> <div><p>${task.time}</p><i class="fa fa-clock-o" aria-hidden="true"></i></div>
		</li>
		`;
		}//with the 'id' for the input and the 'for' for the label being exactly the same, you can click the label and the checkbox will check 
	}).join(''); //convert the array into a string
}

function toggleDone(event) {
	if (!event.target.matches('input')) return; //skip this unless it is an input
	//console.log(e.target); // the above will log only inputs
	const el = event.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done; //change the prop
	/*time completed*/
	const newTime = Date.now();
	let x = ~~((newTime - items[index].time) / 1000); 
	let seconds = ~~((newTime - items[index].time) / 1000) < 60 ? ~~((newTime - items[index].time) / 1000) : ~~((newTime - items[index].time) / 1000) % 60; 
	let minutes = ~~(x / 60) < 60 ? ~~(x / 60) : ~~(x / 60) % 60; 
	let y = ~~(x / 60);
	let hours = ~~(y/ 60)
	items[index].time = `${hours}:${minutes < 10 ? '0' :''}${minutes}:${seconds < 10 ? '0' :''}${seconds}`;  

	localStorage.setItem('items', JSON.stringify(items)); //save to local storage 
	populateList(items, itemsList); // update whats on the page
}
function resetList() {
	//one way
	items = []; //change const items =, to let items = 
	localStorage.setItem('items', JSON.stringify(items));  
	populateList(items, itemsList);
	localStorage.clear(); 
	//other way, 
		//keep const items = instead of let
	//localStorage.clear(); 
	//window.location.reload();
}

addItems.addEventListener('submit', addItem); 
itemsList.addEventListener('click', toggleDone); //event delegation = the 'ul' element will be on the page at the time the event is triggered, which in turn pass the event on to one of its child elements.
reset.addEventListener('click', resetList)

populateList(items, itemsList);  //populate onLoad
