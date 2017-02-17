'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log('hei');
	$("#saveSchedule").click(saveSchedule);
	makeDriveCard();
})

/*
 * Function that is called when the document is ready.
 */


function makeDriveCard(e){


	$.get("/rides", setCardHeader);
	$.get("/rides", setCardBody)


} 

function setCardHeader(result){
	var drivecard = result.drivecard;
	var username = $("div.jumbotron.homepage").text().substr(12).trim();
	console.log(username);
	for (var i=0; i < drivecard.length; i++){
		if (String(username).toUpperCase() == String(drivecard[i]["driver"]).toUpperCase()){
			$("#headerdrivecard"+drivecard[i]["id"]).html("You drive");
		} else{
			$("#headerdrivecard"+drivecard[i]["id"]).html(drivecard[i]["driver"] + " drives");
		}
	}

}


function setCardBody(result){
	var drivecard = result.drivecard;
	var username = $("div.jumbotron.homepage").text().substr(12).trim();
	console.log(username);
	for (var i=0; i < drivecard.length; i++){
		if (String(username).toUpperCase() == String(drivecard[i]["driver"]).toUpperCase()){
			$("#bodydrivecard"+drivecard[i]["id"]).html(drivecard[i]["pickUpTime"]+
														"<br>"+
														"pick up <br>" + 
														"@ <br>" +
														drivecard[i]["pickUpDestination"]["address"][0]);
		} else{
			$("#bodydrivecard"+drivecard[i]["id"]).html("Be ready for pick up at " + drivecard[i]["pickUpTime"]);
		}
	}
}



function initializePage() {
	// add any functionality and listeners you want here

	$("#personimg").click(redirect);
	$("#login").click(index);
	$.get('data',checkSelect);


}

function redirect() {
	$(this).text("Changed text");
}

function index() {
	event.preventDefault();
	window.location.href('vg.no');
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
	console.log(result.data.days[0]['seats']);
	
	for (var i=0; i<5; i++){
		checkSelectedValues(result,i);
	}	
}

function checkSelectedValues(result,seatsID) {

	var liste = ["#MSeats","#TuSeats","#WSeats","#ThSeats","#FSeats"];
	var Seats = result.data.days[seatsID]['seats'];


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
