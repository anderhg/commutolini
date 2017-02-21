'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log(document.cookie);
	$("#saveSchedule").click(saveSchedule);
	$("#login").click(login);
	$("#logoff").click(logoff);
<<<<<<< HEAD
	$("#saveProfile").click(saveProfile);
=======
	$('#register').click(register);
>>>>>>> 19f288543b95236953e7e758cf6d655d31270659

})

/*
 * Function that is called when the document is ready.
 */





function initializePage() {
	// add any functionality and listeners you want here
	var path = window.location.pathname;
	var data = 'data';
	if (path.slice(0,path.lastIndexOf('/')+1) == "/profile/"){
		data = '../data';
	}


	$.get(data,checkData);

}



function saveSchedule() {

	event.preventDefault();

	console.log(TuEnd);


	var data = {
	"MStart": document.getElementById('MStart').value,
	"TuStart": document.getElementById('TuStart').value,
	"WStart": document.getElementById('WStart').value,
	"ThStart": document.getElementById('ThStart').value,
	"FStart": document.getElementById('FStart').value,
	"MEnd": document.getElementById('MEnd').value,
	"TuEnd": document.getElementById('TuEnd').value,
	"WEnd": document.getElementById('WEnd').value,
	"ThEnd": document.getElementById('ThEnd').value,
	"FEnd": document.getElementById('FEnd').value,
	"MSeats": document.getElementById('MSeats').value,
	"TuSeats": document.getElementById('TuSeats').value,
	"WSeats": document.getElementById('WSeats').value,
	"ThSeats": document.getElementById('ThSeats').value,
	"FSeats": document.getElementById('FSeats').value,
	"home": document.getElementById('inHome').value,
	"destination": document.getElementById('inDest').value
	};

	$.post('/add', data, saveScheduleCallback(data));

}

function checkData(result){

	var path = window.location.pathname;
	
	if (path == "/schedule"){
		for (var i=0; i<5; i++){
			console.log(i);
			checkSelectedValues(result,i);
		}

		checkAddresses(result);

	}

	if (path == "/profile"){

		for (var i=0; i<result.users[document.cookie.split('=')[1]].rating;i++){
			$('#rating').append('<a href="#"><span class="fa fa-star"></span></a>&nbsp');
		}
	} else if (path.slice(0,path.lastIndexOf('/')+1) == "/profile/"){
		var username = path.slice(path.lastIndexOf('/')+1);
		console.log(username);
		for (var i=0; i<result.users[username].rating;i++){
			$('#rating').append('<a href="#"><span class="fa fa-star"></span></a>&nbsp');
		}
	}
}

function checkSelectedValues(result,seatsID) {

	var liste = ["#MSeats","#TuSeats","#WSeats","#ThSeats","#FSeats"];
	var username = document.cookie.split('=')[1];
	console.log(username);
	var Seats = result.schedule[username].days[seatsID].seats;
	console.log(Seats);

	if (Seats == "" || Seats == "1") {
		$(liste[seatsID]).html('<option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>');
	}else if (Seats == "2"){
		$(liste[seatsID]).html('<option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option>');
	}else if (Seats == "3"){
		$(liste[seatsID]).html('<option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option><option>6</option>');
	}else if (Seats == "4"){
		$(liste[seatsID]).html('<option>1</option><option>2</option><option>3</option><option selected>4</option><option>5</option><option>6</option>');
	}else if (Seats == "5"){
		$(liste[seatsID]).html('<option>1</option><option>2</option><option>3</option><option>4</option><option selected>5</option><option>6</option>');
	}else if (Seats == "6"){
		$(liste[seatsID]).html('<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option selected>6</option>');
	}

}

function checkAddresses(result){
	var username = document.cookie.split('=')[1];
	var home = result.users[username].home;
	var dest = result.users[username].destination;

	if (home == 'La Jolla'){
		$('#inHome').html('<option>Pacific Beach</option><option selected>La Jolla</option><option>Downtown</option>');
	} else if (home == 'Downtown'){
		$('#inHome').html('<option>Pacific Beach</option><option>La Jolla</option><option selected>Downtown</option>');
	}

	if (dest == 'SDSU'){
		$('#inDest').html('<option>UCSD</option><option selected>SDSU</option><option>USD</option>');
	} else if (dest == 'USD'){
		$('#inDest').html('<option>UCSD</option><option>SDSU</option><option selected>USD</option>');
	}

}

function saveProfile(){
	event.preventDefault();

	var data = {
		"firstName": document.getElementById('firstName').value,
		"lastName": document.getElementById('lastName').value,
		"address": document.getElementById('profileAddress').value,
		"car": document.getElementById('profileCar').value,


	}

	$.post('/editProfileInfo', data, saveProfileCallback(data));

}

function login(){
	event.preventDefault();
	var username = document.getElementById('username-email').value;
	console.log(username);
	var data = {"username":username};
	$.post('/login',data,loginCallback(data));
	document.cookie = "username="+username;
}

function logoff(){
	event.preventDefault();
	$.post('/logoff',{},logoffCallback({}));

}

function loginCallback(result){
	console.log('1');
	window.location.href = "/homepage";
}

function logoffCallback(result){
	window.location.href = '/';
}

function saveScheduleCallback(result){
	window.location.href = "/homepage";
}

<<<<<<< HEAD
function saveProfileCallback(result){
	window.location.href = "/profile";
}

=======
function register(){
	var username = document.getElementById('username').value;
	var name = document.getElementById('name').value;
	var firstName = name.slice(0,name.lastIndexOf(' '));
	var lastName = name.slice(name.lastIndexOf(' ')+1);
	var password = document.getElementById('password').value;
	var email = document.getElementById('email').value;

	var obj = {
		'username': username,
		'firstName': firstName,
		'lastName': lastName
	}
>>>>>>> 19f288543b95236953e7e758cf6d655d31270659

	$.post('/reg', obj, registerCallback(obj));
	
}

function registerCallback(result){
	window.location.href = "/";
}


