$(document).ready(function(){
	
	var timeout = 0;

	document.getElementById("refresh").addEventListener("click", function(){
		console.log("start run");
		//timeout = window.setTimeout(clockEnd, 4000);
		a = new timer(clockEnd(),550000);

		setInterval(function() {
			console.log('Time left: ' + a.getTimeLeftMinutes(timeout)+ 'm : ' + a.getTimeLeftSeconds(timeout)+'s');
		}, 1000);
	});

});

function clockEnd() {
	$("body").css("background-color", "red");
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
