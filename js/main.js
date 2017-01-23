$(document).ready(function(){

	
	document.getElementById("refresh").addEventListener("click", function(){
		console.log("start run");
		var timeoutID = window.setTimeout(clockEnd, [4000]);
	});

});

function clockEnd() {
	$("body").css("background-color", "red");
}

