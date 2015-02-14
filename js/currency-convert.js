document.getElementById('convert').onclick = function () {
	query();
}

function query() {
	var src_beg = 'http://www.freecurrencyconverterapi.com/api/v3/convert?q=';
	var src_end = '&compact=y&callback=myCallback';
	var src = src_beg + createQuery() + src_end;

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	script.id = 'temp'
	document.body.appendChild(script);
}

function myCallback(data) {
	setResult('');
	attemptAlertRemove();
	if (isNaN(ammount()) || ammount() <= 0) {
		showAlert();
	} else {
		setResult((ammount() * parseFloat(data[createQuery()].val)).toFixed(2));
	}
	var element = document.getElementById('temp');
	document.body.removeChild(element);
}

function attemptAlertRemove() {
	var parent = document.getElementById('form');
	var child = document.getElementById('someClass');
	if (child) {
		var parent = document.getElementById('form');
		parent.removeChild(child);
	}
}

function showAlert() {
	var div = document.createElement('div');
	div.setAttribute('id', 'someClass');
	div.innerHTML = "<div class='col-sm-3'></div><div id='alert' class='alert alert-danger col-sm-5 alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Warning!</strong> Only positive numbers are valid.</div>";
	document.getElementById('form').appendChild(div);
}

function setResult(result) {
	document.getElementById('result').placeholder = result;
}

function createQuery() {
	return from() + '_' + to();
}

function from() {
	return document.getElementById('from_input').value;
}

function to() {
	return document.getElementById('to_input').value;
}

function ammount() {
	return document.getElementById('ammount').value;
}