'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log(document.cookie);
	$("#saveSchedule").click(saveSchedule);
	$("#login").click(login);
	$("#logoff").click(logoff);
	$("#saveProfile").click(saveProfile);
	$('#register').click(register);
	checkProfile();
	$('#starOne').mouseenter(oneStar);
	$('#starOne').mouseleave(removeOneStar);
	$('#starOne').click(oneStarClick);
	$('#starTwo').mouseenter(twoStar);
	$('#starTwo').mouseleave(removeTwoStar);
	$('#starTwo').click(twoStarClick);
	$('#starThree').mouseenter(threeStar);
	$('#starThree').mouseleave(removeThreeStar);
	$('#starThree').click(threeStarClick);
	$('#starFour').mouseenter(fourStar);
	$('#starFour').mouseleave(removeFourStar);
	$('#starFour').click(fourStarClick);
	$('#starFive').mouseenter(fiveStar);
	$('#starFive').mouseleave(removeFiveStar);
	$('#starFive').click(fiveStarClick);
	$('.contactButton').click(contactClick);
	$('.requestCommute').click(requestCommuteClick);
	$('.sendRequest').click(commuteRequest);
	$('#username-email').keypress(function(event) {
	    if (event.keyCode == 13 || event.which == 13) {
	        login();
	        event.preventDefault();
	    }
	});
	$('#password').keypress(function(event) {
	    if (event.keyCode == 13 || event.which == 13) {
	        login();
	        event.preventDefault();
	    }
	});
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
	ga("send", "event", 'save', 'click');


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
	checkStars(result);
	var currentUser = getCookie("username");
	
	if (path == "/schedule"){
		for (var i=0; i<5; i++){
			console.log(i);
			checkSelectedValues(result,i);
		}

		checkAddresses(result);

	}

	var totalRating = 0.0;
	var numberOfRatings = 0;
	var averageRating = 0;

	if (path == "/profile"){
		console.log('profile');
		for (var giver in result.users[currentUser].rating){

			totalRating += result.users[currentUser].rating[giver];
			numberOfRatings++;
		}
	} else if (path.slice(0,path.lastIndexOf('/')+1) == "/profile/"){
		var username = path.slice(path.lastIndexOf('/')+1);
		for (var giver in result.users[username].rating){
			totalRating += result.users[username].rating[giver];
			numberOfRatings++;

		}
	}


	if (totalRating >= 1 && numberOfRatings >= 1){
		var averageRating = totalRating/numberOfRatings;
	}

	console.log(averageRating);
	$('#ratingText').text(averageRating.toFixed(1));
}

function checkSelectedValues(result,seatsID) {

	var liste = ["#MSeats","#TuSeats","#WSeats","#ThSeats","#FSeats"];
	var username = getCookie("username");
	var Seats = result.schedule[username].days[seatsID].seats;


	if (Seats == "" || Seats == "0") {
		$(liste[seatsID]).html('<option selected>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>');
	}else if(Seats =="1") {
		$(liste[seatsID]).html('<option>0</option><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>');		
	}else if (Seats == "2"){
		$(liste[seatsID]).html('<option>0</option><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option>');
	}else if (Seats == "3"){
		$(liste[seatsID]).html('<option>0</option><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option><option>6</option>');
	}else if (Seats == "4"){
		$(liste[seatsID]).html('<option>0</option><option>1</option><option>2</option><option>3</option><option selected>4</option><option>5</option><option>6</option>');
	}else if (Seats == "5"){
		$(liste[seatsID]).html('<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option selected>5</option><option>6</option>');
	}else if (Seats == "6"){
		$(liste[seatsID]).html('<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option selected>6</option>');
	}

}

function checkAddresses(result){
	var username = getCookie("username");
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

	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var address = document.getElementById('profileAddress').value;
	var car = document.getElementById('profileCar').value;
	var about = document.getElementById('profileAbout').value;
	var phoneNumber = document.getElementById('profilePhone').value;
	var email = document.getElementById('profileEmail').value;

	var data = {
		"firstName": firstName,
		"lastName": lastName,
		"address": address,
		"car": car,
		"about": about,
		"phoneNumber": phoneNumber,
		"email": email
	}

	if (firstName.length == 0){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>First name not entered.</div>');
	}else if (lastName.length == 0){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Last name not entered.</div>');
	}else if (email.length == 0 || email.search('@') == -1){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Email not valid.</div>');
	}else{
		$.post('/editProfileInfo', data, saveProfileCallback(data));
	}

}

function login(){
	event.preventDefault();
	var username = document.getElementById('username-email').value;
	var data = {"username":username};
	$.post('/login',data,loginCallback(data));
	document.cookie = "username="+username;
}

function logoff(){
	event.preventDefault();
	$.post('/logoff',{},logoffCallback({}));

}

function loginCallback(result){
	window.location.href = "/homepage";
}

function logoffCallback(result){
	window.location.href = '/';
}

function saveScheduleCallback(result){
	window.location.href = "/homepage";
}

function saveProfileCallback(result){
	window.location.href = "/profile";
}

function register(){
	$.get('data', registerGetCallback);
}

function registerGetCallback(result){
	var username = document.getElementById('username').value;
	var name = document.getElementById('name').value;
	var firstName = name.slice(0,name.lastIndexOf(' '));
	var lastName = name.slice(name.lastIndexOf(' ')+1);
	var password = document.getElementById('password').value;
	var email = document.getElementById('email').value;

	var obj = {
		'username': username,
		'firstName': firstName,
		'lastName': lastName,
		'email': email
	}

	if (username.length == 0){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Username not entered.</div>');
	}else if (result.users[username] != undefined){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Username already exists.</div>');
	}else if (name.split(' ').length < 2){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Name not valid. Remember to insert full name.</div>');
	}else if (email.length == 0 || email.search('@') == -1){
		$('#alert').html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Email not valid.</div>');
	}else{
		$.post('/reg', obj, registerCallback(obj));
	}
	
}

function registerCallback(result){
	event.preventDefault();
	var data = {"username":result.username};
	console.log("all fine");
	$.post('/login',data,loginCallback(data));
	document.cookie = "username="+result.username;
}

function checkProfile(){
	if (window.location.pathname == "/profile"){
		$("#checkProfile").html('<a href="/editProfile" class="btn btn-primary btn-lg" id="editProfileBtn" role="button">Edit Profile</a>');
	}
}

var mouseenterno = 0;


function checkStars(result){
}

function oneStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
}

function removeOneStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
}

function twoStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starTwo').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
}

function removeTwoStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starTwo').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
}

function threeStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starTwo').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starThree').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
}

function removeThreeStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starTwo').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starThree').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
}

function fourStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starTwo').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starThree').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starFour').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
}

function removeFourStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starTwo').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starThree').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starFour').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
}

function fiveStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starTwo').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starThree').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starFour').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
	$('#starFive').removeClass('glyphicon glyphicon-star-empty').addClass('glyphicon glyphicon-star');
}

function removeFiveStar(){
	$('#starOne').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starTwo').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starThree').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starFour').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
	$('#starFive').removeClass('glyphicon glyphicon-star').addClass('glyphicon glyphicon-star-empty');
}

function oneStarClick(){
	$('#profileRating').html('<i class="glyphicon glyphicon-star" id="starOne"></i><i class="glyphicon glyphicon-star-empty" id="starTwo"></i><i class="glyphicon glyphicon-star-empty" id="starThree"></i><i class="glyphicon glyphicon-star-empty" id="starFour"></i><i class="glyphicon glyphicon-star-empty" id="starFive"></i>')
	var path = window.location.pathname;
	var receiver;
	if (path != "/profile"){
		receiver = path.slice(path.lastIndexOf('/')+1);
	}else{
		receiver = getCookie("username");
	}
	$.post('/giveRating',{'stars':1, 'giver':getCookie("username"), 'receiver':receiver}, ratingCallback());
}

function twoStarClick(){
	$('#profileRating').html('<i class="glyphicon glyphicon-star" id="starOne"></i><i class="glyphicon glyphicon-star" id="starTwo"></i><i class="glyphicon glyphicon-star-empty" id="starThree"></i><i class="glyphicon glyphicon-star-empty" id="starFour"></i><i class="glyphicon glyphicon-star-empty" id="starFive"></i>')
	var path = window.location.pathname;
	var receiver;
	if (path != "/profile"){
		receiver = path.slice(path.lastIndexOf('/')+1);
	}else{
		receiver = getCookie("username");
	}
	$.post('/giveRating',{'stars':2, 'giver':getCookie("username"), 'receiver':receiver}, ratingCallback());
}

function threeStarClick(){
	$('#profileRating').html('<i class="glyphicon glyphicon-star" id="starOne"></i><i class="glyphicon glyphicon-star" id="starTwo"></i><i class="glyphicon glyphicon-star" id="starThree"></i><i class="glyphicon glyphicon-star-empty" id="starFour"></i><i class="glyphicon glyphicon-star-empty" id="starFive"></i>')
	var path = window.location.pathname;
	var receiver;
	if (path != "/profile"){
		receiver = path.slice(path.lastIndexOf('/')+1);
	}else{
		receiver = getCookie("username");
	}
	$.post('/giveRating',{'stars':3, 'giver':getCookie("username"), 'receiver':receiver}, ratingCallback());
}

function fourStarClick(){
	$('#profileRating').html('<i class="glyphicon glyphicon-star" id="starOne"></i><i class="glyphicon glyphicon-star" id="starTwo"></i><i class="glyphicon glyphicon-star" id="starThree"></i><i class="glyphicon glyphicon-star" id="starFour"></i><i class="glyphicon glyphicon-star-empty" id="starFive"></i>')
	var path = window.location.pathname;
	var receiver;
	if (path != "/profile"){
		receiver = path.slice(path.lastIndexOf('/')+1);
	}else{
		receiver = getCookie("username");
	}
	$.post('/giveRating',{'stars':4, 'giver':getCookie("username"), 'receiver':receiver}, ratingCallback());
}

function fiveStarClick(){
	$('#profileRating').html('<i class="glyphicon glyphicon-star" id="starOne"></i><i class="glyphicon glyphicon-star" id="starTwo"></i><i class="glyphicon glyphicon-star" id="starThree"></i><i class="glyphicon glyphicon-star" id="starFour"></i><i class="glyphicon glyphicon-star" id="starFive"></i>')
	var path = window.location.pathname;
	var receiver;
	if (path != "/profile"){
		receiver = path.slice(path.lastIndexOf('/')+1);
	}else{
		receiver = getCookie("username");
	}
	$.post('/giveRating',{'stars':5, 'giver':getCookie("username"), 'receiver':receiver}, ratingCallback());
}

function ratingCallback(){
	setTimeout(initializePage, 1);
}

function contactClick(){
	var id = $(this).attr('id').trim();
	var text = $('#'+id).text();
	var username = id.slice(7);


	if (text == "Contact"){
		$('#'+id).text("Show Schedule");
		$('#info'+ username).hide();
		$('#contactInfo'+username).show();
	} else{
		$('#'+id).text("Contact");
		$('#contactInfo'+username).hide();
		$('#info'+ username).show();
	}	
}


function requestCommuteClick(){
	var username = $(this).attr('id').trim();

	var modal = document.getElementById('modal'+username);
	modal.style.display = 'block';

	//Closes the modal when user clicks outside of the modal box.
	window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    	}
	}

    //Closes the modal when user clicks X or close button. 
    var close = document.getElementsByClassName("closeModal");
    for (var i=0; i<close.length; i++){
	    close[i].onclick = function(){
	    	modal.style.display = "none";
	    }

    }



}

function commuteRequest(){
	var id = $(this).attr('id').trim();
	var username = id.slice(11);

	var callback = function(response) {
		commuteRequestCallback(username, response);
	};
	$.get('data', callback);
}


    

function commuteRequestCallback(username, result){

	var modal = document.getElementById('modal'+username);

	var days = document.getElementsByClassName("requestDays"+username);
    var requestedDays = [];

    var pointsNeeded = 0;

    for (var i=0; i<days.length; i++){
    	if (days[i].checked){
    		requestedDays[days[i].value] = 1;
    		days[i].checked = false;
    		pointsNeeded++;
    	} else {
    		requestedDays[days[i].value] = 0;
    	}
    }

	var currentUser = getCookie("username");

    console.log(requestedDays['Monday']);

    if(pointsNeeded>result.users[currentUser].rides){
    	$('#alert'+username).html('<div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert">×</a><i class="glyphicon glyphicon-ban-circle"></i>Not enough rides available.</div>');
    } else{
    	console.log(requestedDays);
    	modal.style.display = "none";
    	var request = {
    		'sender': currentUser,
    		'receiver': username,
    		'monday': requestedDays['Monday'],
    		'tuesday': requestedDays['Tuesday'],
    		'wednesday': requestedDays['Wednesday'],
    		'thursday': requestedDays['Thursday'],
    		'friday': requestedDays['Friday']
    	};
    	$.post('/commuteRequest', request, postRequestCallback);
    }
 
}

function postRequestCallback(result){
	window.location.href = "/homepage";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}