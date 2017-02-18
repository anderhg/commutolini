'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log('hei');
	$("#saveSchedule").click(saveSchedule);
	$("#login").click(login);
	$("#logoff").click(logoff);

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
	var MStart = document.getElementById('MStart').value;
	var TuStart = document.getElementById('TuStart').value;
	var WStart = document.getElementById('WStart').value;
	var ThStart = document.getElementById('ThStart').value;
	var FStart = document.getElementById('FStart').value;
	var MEnd = document.getElementById('MEnd').value;
	var TuEnd = document.getElementById('TuEnd').value;
	var WEnd = document.getElementById('WEnd').value;
	var ThEnd = document.getElementById('ThEnd').value;
	var FEnd = document.getElementById('FEnd').value;
	var MSeats = document.getElementById('MSeats').value;
	var TuSeats = document.getElementById('TuSeats').value;
	var WSeats = document.getElementById('WSeats').value;
	var ThSeats = document.getElementById('ThSeats').value;
	var FSeats = document.getElementById('FSeats').value;

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
	"FSeats": document.getElementById('FSeats').value
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
	}

	if (path == "/profile"){
		for (var i=0; i<result.currentUser.rating;i++){
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
	var username = result.currentUser.username;
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

function login(){
	event.preventDefault();
	var username = document.getElementById('username-email').value;
	console.log(username);
	var data = {"username":username};
	$.post('/login',data,loginCallback(data));
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
	window.location.href = "/schedule";
}




/*function checkUser(result){

	console.log(result.data);

	if (result.currentUser.firstName == undefined && window.location.href != "http://localhost:3000/"){
		window.location.replace("/");
	}

}*/
