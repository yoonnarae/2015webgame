window.addEventListener("load",drawScreen,false);
window.addEventListener("keydown",onkeydown,false);
window.addEventListener("keyup",onkeyup,false);
window.addEventListener("mousemove",onMouseMove,false);
window.addEventListener("mousedown",onMouseDown,false);
window.addEventListener("mouseup",onMouseUp,false);

var strKeyEventType = "none";
var strKeyEventValue = "none";

var bMouseClicked = false;
intPlayerX = 480;
intPlayerY = 300;
var strMouseStatus = "준비중";

var imgBackground = new Image();
imgBackground.src = "background.png";

var imgPlayer = new Image();
imgPlayer.src = "player.png";

imgPlayer.addEventListener("load",drawScreen,false);

var theCanvas;

var Game_STATE_READY = 0;
var Game_STATE_GAME = 1;
var Game_STATE_OVER = 2;
var GameState = Game_STATE_READY;

var ball = new Image();
ball.src = "ball.png";

var intervalID;

var tempBall1 = { x:0, y:0, go_x:1, go_y:1 };
var tempBall2 = { x:800, y:0, go_x:-1, go_y:1 };
var tempBall3 = { x:800, y:600, go_x:-1, go_y:-1 };
var tempBall4 = { x:0, y:600, go_x:1, go_y:-1 };



function drawScreen() {
	theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground,0,0,1000,700);
	
	/* 마우스 움직이기 */
	Context.drawImage(imgPlayer, intPlayerX, intPlayerY, 140, 220);
	Context.filStyle = "#000";
	Context.font = "24px nanumgothic";
	Context.textBaseline = "top";
	Context.textAlign = "left";
	Context.fillText("발생한 마우스 이벤트는 : " + strMouseStatus, 5, 5);

	/*텍스트 그리기 */
	Context.fillStyle = "#000";
	Context.font = "24px nanumgothic";
	Context.textBaseline = "top";
	Context.textAlign = "right";
	Context.fillText("입력된 키는 : " + strKeyEventValue, 1000, 5);
	Context.fillText("키 입력상태는 : " + strKeyEventType,  1000, 30);

	/* 게임 상태 */
	if(GameState == Game_STATE_READY) {
		Context.fillText ("Ready!", 470, 250);
	} else if(GameState == Game_STATE_GAME) {
		Context.fillText ("Go!", 300, 200);
		Context.drawImage(ball, tempBall1.x, tempBall1.y);
		Context.drawImage(ball, tempBall2.x, tempBall2.y);
		Context.drawImage(ball, tempBall3.x, tempBall3.y);
		Context.drawImage(ball, tempBall4.x, tempBall4.y);
	} else if(GameState == Game_STATE_READY) {
		Context.font = '60px NanumGothic';
		Context.fillText ("Game Over", 400, 300);
	}



}

function onkeydown(e) {
	strKeyEventType = e.type;
	if(e.keyCode)code = e.keyCode;
	strKeyEventValue = code;
	/* 게임 상태 */
	if(GameState == Game_STATE_READY) {
		if(e.keyCode == 13) {
			GameState = Game_STATE_GAME;
			onGameStart();
		}
	}else if(GameState == Game_STATE_GAME) {
		/* 키보드 움직이기 */
		switch(e.keyCode) {
		case 37 : 
			intPlayerX -= 10;
			if(intPlayerX < 0) 
				intPlayerX = 0;
			break;
		case 39 : 
			intPlayerX += 10;
			if(intPlayerX > theCanvas.width-140) 				
				intPlayerX = theCanvas.width-140;
			break;
		case 38 : 
			intPlayerY -= 10;
			if(intPlayerY < 0) 
				intPlayerY = 0;
			break;
		case 40 : 
			intPlayerY += 10;
			if(intPlayerY > theCanvas.height-220) 
				intPlayerY = theCanvas.height-220;			
			break;
		}
	}else if(GameState == Game_STATE_OVER) {
		if(e.keyCode == 13) {
			GameState = Game_STATE_READY;
		}
	}
	
	drawScreen();
}

function onkeyup(e) {
	strKeyEventType = e.type;
	if(e.keyCode)code = e.keyCode;
	strKeyEventValue = code;
	drawScreen();
}

function onMouseDown(e) {
	strMouseStatus = "클릭!";
	var theCanvas = document.getElementById("GameCanvas");
	bMouseClicked = true;
	intMouseX = e.clientX - theCanvas.offsetLeft-42;
	intMouseY = e.clientY - theCanvas.offsetTop-50;
	drawScreen();
}

function onMouseMove(e) {
	strMouseStatus = "Moving now";
	if(bMouseClicked) {	
		var theCanvas = document.getElementById("GameCanvas");
		bMouseClicked = true;
		intMouseX = e.clientX - theCanvas.offsetLeft-42;
		intMouseY = e.clientY - theCanvas.offsetTop-50;
		drawScreen();
	}
}	

function onMouseUp(e) {
	strMouseStatus = "클릭 끝!";
	bMouseClicked = false;
	intMouseX = 480;
	intMouseY = 300;
	drawScreen();
}

function onGameStart() {
	intervalID = setInterval(MoveBall, 100);
}

function MoveBall() {
	tempBall1.x += tempBall1.go_x * 10;
	tempBall1.y += tempBall1.go_y * 10;

	tempBall2.x += tempBall2.go_x * 10;
	tempBall2.y += tempBall2.go_y * 10;

	tempBall3.x += tempBall3.go_x * 10;
	tempBall3.y += tempBall3.go_y * 10;

	tempBall4.x += tempBall4.go_x * 10;
	tempBall4.y += tempBall4.go_y * 10;
	
	drawScreen();
}