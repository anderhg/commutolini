'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log('hei');
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

}

function redirect() {
	$(this).text("Changed text");
}

function index() {
	event.preventDefault();
	window.location.href('vg.no');
}
