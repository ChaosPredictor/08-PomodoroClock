var a;
var interval;
var workTime = 60;
var workOn = false;

$(document).ready(function(){
	
	var timeout = 0;
	drowArc();
	drowArc(1, secondsToShow(workTime));

	$(".button").click( function () {
		//console.log(this.id);
		if (!workOn) {
			buttonClicked(this.id);
			drowArc(1, secondsToShow(workTime));
		}
	});

	document.getElementById("refresh").addEventListener("click", function(){
		console.log("start run");
		workOn = true;

		timer = new timer(function(){
			timerEnd();
		},workTime * 1000);
		
		interval = setInterval(function() {
			//console.log('Time left: ' + timer.getTimeLeftMinutes(timeout)+ 'm : ' + timer.getTimeLeftSeconds(timeout)+'s');
			drowArc(timer.getTimeLeft()/(workTime*1000), secondsToShow(timer.getTimeLeftOnlySeconds()));
		}, 100);

	});

});

function buttonClicked(btn) {
	switch (btn) {
		case "sec-plus" :
			workTime += 1;
			return;
		case "sec-minus" :
			workTime -= 1;
			return;
		case "min-plus" :
			workTime += 60;
			return;
		case "min-minus" :
			workTime -= 60;
			return;
	}
}

function secondsToShow(sec) {
	return pad(Math.floor(Math.round(sec)/60),2)+ ' : ' + pad(Math.round(sec)%60,2);
}

function timerEnd() {
	timer.pause();
	workOn = false;
	clearInterval(interval);
	$("body").css("background-color", "red");
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
