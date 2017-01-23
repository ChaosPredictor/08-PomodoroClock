var a;
var interval;

$(document).ready(function(){
	
	var timeout = 0;

	document.getElementById("refresh").addEventListener("click", function(){
		console.log("start run");
		timer = new timer(function(){
			timerEnd();
		},5000);

		interval = setInterval(function() {
			console.log('Time left: ' + timer.getTimeLeftMinutes(timeout)+ 'm : ' + timer.getTimeLeftSeconds(timeout)+'s');
		}, 1000);
	});

});




function timerEnd() {
	timer.pause();
	clearInterval(interval);
	$("body").css("background-color", "red");
}

function printTimer(minutes, seconds){

}

function getTimeLeft(timeout) {
	return Math.ceil((timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000);
}

function timer(callback, delay) {
	var id, started, remaining = delay, running

	this.start = function() {
		running = true
		started = new Date()
		id = setTimeout(callback, remaining)
	}

	this.pause = function() {
		running = false
		clearTimeout(id)
		remaining -= new Date() - started
	}

	this.getTimeLeft = function() {
		if (running) {
			this.pause()
			this.start()
		}
		
		return remaining;
	}

	this.getTimeLeftSeconds = function() {
		if (running) {
			this.pause()
			this.start()
		}
		
		return Math.round(remaining/1000)%60;
	}

	this.getTimeLeftMinutes = function() {
		if (running) {
			this.pause()
			this.start()
		}
		
		return Math.floor(Math.round(remaining/1000)/60);
	}

	this.getStateRunning = function() {
		return running
	}

	this.start();
}
