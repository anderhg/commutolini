'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log('hei');
})

/*
 * Function that is called when the document is ready.
 */
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
