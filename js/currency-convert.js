//	On click begin query to get conversion rate
document.getElementById('convert').onclick = function () {
	query();
}

//	Query's the conversion rate data from www.freecurrencyconverterap.com
function query() {
	var src_beg = 'http://www.freecurrencyconverterapi.com/api/v3/convert?q=';
	var src_end = '&compact=y&callback=myCallback';
	var src = src_beg + createQuery() + src_end;	//	the url to query the data

	//	add a script tag to the end of the body containing the response
	//	of our query
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	script.id = 'temp'
	document.body.appendChild(script);
}

//	A callback function that results from the query
function myCallback(data) {
	setResult('');	//	if result is already set clear it
	attemptAlertRemove();	//	if an alert exists clear it
	if (isNaN(ammount()) || ammount() <= 0) {
		//	if ammount entered by user is not a positive number show alert 
		showAlert();
	} else {
		//	else set the result to the converted value
		setResult((ammount() * parseFloat(data[createQuery()].val)).toFixed(2));
	}
	//	this removes the script tag that manages the data query
	var element = document.getElementById('temp');
	document.body.removeChild(element);
}

//	A function to attempt to remove an alert if it exists
function attemptAlertRemove() {
	var parent = document.getElementById('form');	//	all alerts are stored under form
	var child = document.getElementById('the-alert');	//	the alert has an id of the-alert
	if (child) {
		//	if child is not null then remove the child
		parent.removeChild(child);
	}
}

//	Adds an alert to the page
function showAlert() {
	var div = document.createElement('div');	//	create a div to hold the alert
	div.setAttribute('id', 'the-alert');	//	set id of the alert to the-alert
	//	thye code for the alert is set to the innerHTML of the div
	div.innerHTML = "<div class='col-sm-3'></div><div id='alert' class='alert alert-danger col-sm-5 alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Warning!</strong> Only positive numbers are valid.</div>";
	document.getElementById('form').appendChild(div);	//	append to the end of our form
}

//	Sets the placeholder for the result to the value passed
function setResult(result) {
	document.getElementById('result').placeholder = result;
}

//	Sets the GET query request variable of the formate FROM_TO
//	e.g. converting USD to EUR would be USD_EUR
function createQuery() {
	return from() + '_' + to();
}

//	Returns the current value of the from currency
function from() {
	return document.getElementById('from_input').value;
}

//	Returns the current value of the to currency
function to() {
	return document.getElementById('to_input').value;
}

//	Returns the ammount entered by the user
function ammount() {
	return document.getElementById('ammount').value;
}