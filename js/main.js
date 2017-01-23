$(document).ready(function(){

	
	document.getElementById("refresh").addEventListener("click", function(){
		var timeoutID = window.setTimeout(clockEnd, [1000]);
	});

});

function clockEnd() {
	$("body").css("background-color", "red");
}

