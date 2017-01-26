var a;
var interval;
var workTime = 15;
var breakTime = 10;
var workOn = false;
var breakOn = false;
var runTimer;
var timerPause = false;
var endOfWork = new Audio('audio/endOfWork.mp3');
var endOfBreak = new Audio('audio/endOfBreak.mp3');

$(document).ready(function(){
	
	var timeout = 0;
	drowArc();
	drowArc(1, secondsToShow(workTime));
	$("#work-time").text(secondsToShow(workTime));
	$("#break-time").text(secondsToShow(breakTime));

	$(".btn-work").click( function () {
		//console.log(this.id);
		if (!workOn) {
			workTime += buttonClicked(this.id);
			$("#work-time").text(secondsToShow(workTime));
			if (!breakOn) {
				drowArc(1, secondsToShow(workTime));
			}
		}
	});

	$(".btn-break").click( function () {
		//console.log(this.id);
		if (!breakOn) {
			breakTime += buttonClicked(this.id);
			$("#break-time").text(secondsToShow(breakTime));
		}
	});

	document.getElementById("refresh").addEventListener("click", function(){
		//console.log("button pushed");
		if (!workOn && !breakOn) {
			workOn = true;
			startRun(workTime);
		} else if(timerPause) {
			timerPause = false;
			console.log("runTimer: " + runTimer);
			runTimer.start();
		} else {
			timerPause = true;
			console.log("runTimer: " + runTimer);
			runTimer.pause();
		}
	}); 
	
	document.getElementById("refresh").addEventListener("dblclick", function() {
		runTimer.pause();
		runTimer = null;
		workOn = false;
		breakOn = false;
		timerPause = false;
		drowArc(1, secondsToShow(workTime));
		clearInterval(interval);
		$(".main-div").css("background-color", "grey");
	}); 

});

function startRun(time){

		console.log("start run");
		//workOn = true;
		if (workOn) {
			$(".main-div").css("background-color", "blue");
		} else if (breakOn) {
			$(".main-div").css("background-color", "green");
		}
		console.log("timer: " + runTimer);
		runTimer = new timer(function(){
			console.log("end time");
			timerEnd()
		},time * 1000);
		
		interval = setInterval(function() {
			//console.log('Time left: ' + timer.getTimeLeftMinutes(timeout)+ 'm : ' + timer.getTimeLeftSeconds(timeout)+'s');
			drowArc(runTimer.getTimeLeft()/(time*1000), secondsToShow(runTimer.getTimeLeftOnlySeconds()));
		}, 50);

}

function timerEnd() {

	runTimer.pause();
	runTimer = null;
	clearInterval(interval);
	//$("body").css("background-color", "red");
	if (!workOn) {
		endOfBreak.play();
		console.log("work time");
		workOn = true;
		breakOn = false;
		startRun(workTime);
	} else {
		endOfWork.play();
		console.log("break time");
		breakOn= true;
		workOn = false;
		startRun(breakTime);
	}
}

function buttonClicked(btn) {
	switch (btn) {
		case "sec-plus" :
			//workTime += 1;
			return 1;
		case "sec-minus" :
			//workTime -= 1;
			return -1;
		case "min-plus" :
			//workTime += 60;
			return 60;
		case "min-minus" :
			//workTime -= 60;
			return -60;
	}
}

function secondsToShow(sec) {
	return pad(Math.floor(Math.round(sec)/60),2)+ ' : ' + pad(Math.round(sec)%60,2);
}

function printTimer(on){
	on.innerHTML = "My new text!";
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

	this.getTimeLeftOnlySeconds = function() {
		if (running) {
			this.pause()
			this.start()
		}
		
		return Math.round(remaining/1000);
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

function drowArc(part, text){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d")
	ctx.clearRect(0, 0, c.width, c.height);;
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth=10;
	ctx.beginPath();
	ctx.font = "58px Transponder";
	ctx.fillText(text, 140, 237);
	ctx.arc(220, 220, 200, (1.5 - 2 * part) * Math.PI, 1.5 * Math.PI);
	ctx.stroke();
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
