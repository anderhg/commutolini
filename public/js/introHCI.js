'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log('hei');
	$("#saveSchedule").click(saveSchedule);
	$("#login").click(login);

})

/*
 * Function that is called when the document is ready.
 */





function initializePage() {
	// add any functionality and listeners you want here

	$("#personimg").click(redirect);
	$.get('data',checkSelect);
	$.get('data',checkUser);




}

function redirect() {
	$(this).text("Changed text");
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

	window.location.href = "/add?MStart=" + MStart + "&TuStart=" + TuStart + "&WStart=" + WStart + "&ThStart=" + ThStart + "&FStart=" + FStart
	+ "&MEnd=" + MEnd + "&TuEnd=" + TuEnd + "&WEnd=" + WEnd + "&ThEnd=" + ThEnd + "&FEnd=" + FEnd + "&MSeats=" + MSeats + "&TuSeats=" + TuSeats + "&WSeats=" + WSeats + "&ThSeats=" + ThSeats + "&FSeats=" + FSeats;



}

function checkSelect(result){
	
	for (var i=0; i<5; i++){
		checkSelectedValues(result,i);
	}	
}

function checkSelectedValues(result,seatsID) {

	var liste = ["#MSeats","#TuSeats","#WSeats","#ThSeats","#FSeats"];
	var Seats = result.days[seatsID]['seats'];


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
	$.post('/username',data,loginCallback(data));
}

function loginCallback(result){
	console.log('1');
	window.location.href = "/homepage";
}

function checkUser(result){

	console.log(result.data);

	if (result.currentUser.firstName == undefined && window.location.href != "http://localhost:3000/"){
		window.location.replace("/");
	}

}
