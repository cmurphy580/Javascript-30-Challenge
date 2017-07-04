/*JAVASCRIPT TO UPDATE THE CSS VARIABLES WHEN ADJUSTED THROUGH HTML INPUTS*/
const inputs = document.querySelectorAll('.controls input');  /*selects all inputs within control div*/

function handleUpdate() {
	const suffix = this.dataset.sizing || '';  /*dataSet Object*/ /*'' returns to default = nothing*/
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix) /*To target css variables we select the entire document, or the 'root', then set a property of base, spacing, or blur!*/
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));