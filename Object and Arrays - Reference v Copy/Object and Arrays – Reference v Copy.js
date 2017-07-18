// start with strings, numbers and booleans
//let age = 100; 
//let age2 = age; 
//console.log(age, age2) // 100, 100
//age = 200; 
//console.log(age, age2) // 200, 100 - the value of age goes into the variable at the same time. 
////works the same way for strings 
//let name = 'Conor'; 
//let name2 = name; 
//console.log(name, name2); //Conor, Conor
//name = 'Timothy'; 
//console.log(name, name2); //Timothy, Conor

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players; 

console.log(players, team)
// You might think we can just do something like this:
team[3] = 'Lux'; //alters both arrays. Want to make a copy instead of a reference to fix this problem. 
// however what happens when we update that array?
// now here is the problem!

console.log(players, team)//Both arrays have 'Lux'. 
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!
// ONE WAY to make a copy of an array, 
const team2 = players.slice(); 
team2[3] = 'Lux'; //'Lux' is added to team2, and the players array remains unchanged.

// or create a new array and concat the old one in
const team3 = [].concat(players); 

// or use the new ES6 Spread
const team4 = [...players];
team4[3] = 'Hee Hoo'
console.log(team4) //last name changed in array, but players array remains untouched

//lastly we can,
const team5 = Array.from(players); 
team5[3] = 'Cheese';
console.log(team5) //players array remains unchanged, team5's last value has been replaced by 'Cheese'
// now when we update it, the original one isn't changed


// The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
    name: 'Wes Bos'; 
    age: 80
}; 
// and think we make a copy:
const captain = person; //Can't do this. 
captain.number = 99 //this adds to the person the object number: 99. 

// how do we take a copy instead?
const cap2 = Object.assign({}, person, { number: 99, age: 12 }) //Use object assign. first parameter is an empty object, second is the object you would like to copy, and the last any key-values that you would like to add or change.
console.log(cap2) //cap2 has a number of 99 and age of 12, but the person object remains unchanged

// We will hopefully soon see the object ...spread
//const cap3 = {...person} //COMING SOON!!!Found in REACT though.

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method
//, but you should think twice before using it.

const wes = {
    name: 'wes', 
    age: 100, 
    social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
    }
}

console.log(wes);

const dev = Object.assign({}, wes); //copy wes object and assign it to variable, dev.
dev.name = 'wesley';//change name of dev object 

console.log(dev); //wes.name stays the same, but dev.name becomes 'wesley'. 

//BUT, if you change the dev.social.twitter, 
dev.social.twitter = '@coolman'

console.log(dev.social.twitter)//that aspect of the object has changed, but
//so has the value for the wes object
console.log(wes.social.twitter) //logs '@coolman'
//this is because the 'Object.assign' method only goes one level deep. 
//if you need to do a 'clone'
//Can find a function to do this online online, or use lodash's deepClone.
// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method
//, but you should think twice before using it.
//There is a poor man's way to do deep clone an object, but may cause performance issues. 
const dev2 = JSON.parse(JSON.stringify(wes))//will convert the object into a string, then parse back into an object, creating a copy of the object, free of any reference to the original, in the process. 
console.log(dev2);
dev2.social.twitter = '@coolman'; 
console.log(dev2.social)//changed
console.log(wes.social)//doesn't change










