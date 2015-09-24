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

var arrBalls = new Array();

var intTime = 0;

function drawScreen() {
	theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground,0,0,1024,600);
	
	/* 마우스 움직이기 */
	Context.drawImage(imgPlayer, intPlayerX, intPlayerY, 170, 170);
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
		Context.fillText ("Ready!", 512, 300);
	} else if(GameState == Game_STATE_GAME) {
		for(var i = 0; i < arrBalls.length; i++) {
			Context.drawImage(ball, arrBalls[i].x, arrBalls[i].y);
		}
		Context.fillText ("Go!", 512, 300);
	} else if(GameState == Game_STATE_OVER) {
		for(var i = 0; i < arrBalls.length; i++) {
			Context.drawImage(ball, arrBalls[i].x, arrBalls[i].y);
		}
		Context.font = '60px NanumGothic';
		Context.fillText ("Game Over", 712, 300);
	}



}

function onkeydown(e) {
	strKeyEventType = e.type;
	if(e.keyCode)code = e.keyCode;
	strKeyEventValue = code;
	/* 게임 상태 */
	if(GameState == Game_STATE_READY) {
		if(e.keyCode == 13) {
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
			if(intPlayerX > theCanvas.width-170) 				
				intPlayerX = theCanvas.width-170;
			break;
		case 38 : 
			intPlayerY -= 10;
			if(intPlayerY < 0) 
				intPlayerY = 0;
			break;
		case 40 : 
			intPlayerY += 10;
			if(intPlayerY > theCanvas.height-170) 
				intPlayerY = theCanvas.height-170;			
			break;
		}
	}else if(GameState == Game_STATE_OVER) {
		if(e.keyCode == 13) {
			onReady();
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
	intPlayerX = e.clientX - theCanvas.offsetLeft-42;
	intPlayerY = e.clientY - theCanvas.offsetTop-50;
	drawScreen();
}

function onMouseMove(e) {
	strMouseStatus = "Moving now";
	if(bMouseClicked) {	
		var theCanvas = document.getElementById("GameCanvas");
		bMouseClicked = true;
		intPlayerX = e.clientX - theCanvas.offsetLeft-42;
		intPlayerY = e.clientY - theCanvas.offsetTop-50;
		drawScreen();
	}
}	

function onMouseUp(e) {
	strMouseStatus = "클릭 끝!";
	bMouseClicked = false;
	intPlayerX = 480;
	intPlayerY = 300;
	drawScreen();
}

function onGameStart() {
	GameState = Game_STATE_GAME;
    MakeBall();
	intervalID = setInterval(InGameUpdate, 100);   //moveBall
	arrBalls.push({ x:0, y:0, go_x:1, go_y:1});
	arrBalls.push({ x:800, y:0, go_x:-1, go_y:1});
	arrBalls.push({ x:800, y:600, go_x:-1, go_y:-1});
	arrBalls.push({ x:0, y:600, go_x:1, go_y:-1});
    
    for(var i = 0; i < 50; i++) {
        var BallType = RandomNextInt(4);
        var intX, intY, intGoX, intGoY;
        switch (BallType) {
            case 1:
                intX = 0;
                intY = RandomNextInt(theCanvas.height-170);
                intGoX = RandomNextInt(2);
                intGoY = -2 + RandomNextInt(4);
                break;
            case 2:
                intX = 0;
                intY = RandomNextInt(theCanvas.height-170);
                intGoX = RandomNextInt(2);
                intGoY = -2 + RandomNextInt(4);
                break;
            case 3:
                intX = theCanvas.width-170;
                intY = RandomNextInt(theCanvas.height-170);
                intGoX = -2 + RandomNextInt(2);
                intGoY = -2 + RandomNextInt(4);
                break;
            case 4:
                intX = theCanvas.width-170;
                intY = RandomNextInt(theCanvas.height-170);
                intGoX = -2 + RandomNextInt(2);
                intGoY = -2 + RandomNextInt(4);
                break;
                
        }
    }
}

function MoveBall() {
	for(var i = 0;  i < arrBalls.length; i++ ) {
		arrBalls[i].x += arrBalls[i].go_x * 10;
		arrBalls[i].y += arrBalls[i].go_y * 10;
		if(IsCollisionWithPlayer(arrBalls[i].x, arrBalls[i].y)) {
			onGameOver();
		}

		if(arrBalls[i].x < 0 || arrBalls[i].x > 1000 || arrBalls[i].y < 0 || arrBalls[i].y > 700) {
			var BallType = RandomNextInt(4);
			switch (BallType) {
				case 1 : 
					arrBalls[i].x = 0;
					arrBalls[i].y = RandomNextInt(theCanvas.height-170);
					arrBalls[i].go_x = RandomNextInt(2);
					arrBalls[i].go_y = -2 + RandomNextInt(4);
                    break;
                case 2 :
                    arrBalls[i].x = 0;
                    arrBalls[i].y = RandomNextInt(theCanvas.height-170);
                    arrBalls[i].go_x = RandomNextInt(2);
                    arrBalls[i].go_y = -2 + RandomNextInt(4);
                    break;
                case 3 :
                    arrBalls[i].x = theCanvas.width-170;
                    arrBalls[i].y = 0;
                    arrBalls[i].go_x = -2 + RandomNextInt(2);
                    arrBalls[i].go_y = -2 +  RandomNextInt(4);
                    break;
                case 4 :
                    arrBalls[i].x = theCanvas.width-170;
                    arrBalls[i].y = 0;
                    arrBalls[i].go_x = -2 + RandomNextInt(2);
                    arrBalls[i].go_y = -2 + RandomNextInt(4);
                    break;
			}
		}
	}

	drawScreen();
}

function IsCollisionWithPlayer(x, y) {
	if (intPlayerX + 170 > x && intPlayerX + 5 < x + 106 && intPlayerY + 5 < y+ 106 && intPlayerY + 170 > y) {
		return true;
	}
	return false;
}

function onGameOver() {
	GameState = Game_STATE_OVER;
	clearInterval(intervalID);
}

function onReady() {
	GameState = Game_STATE_READY;
	intPlayerX = 480;
	intPlayerY = 300;

	while(arrBalls.length !=0) {
		arrBalls.pop();
	}
}

function RandomNextInt(max) {
	return 1 + Math.floor(Math.random()*max);
}

function InGameUpdate() {
    intTime += 100;
    if(intTime % 500 == 0) {
        for(var i = 0; i < 5; i++) {
            var BallType = RandomNextInt(4);
            var intX, intY, intGoX, intGoY;
            switch (BallType) {
                case 1:
                    intX = 0;
                    intY = RandomNextInt(theCanvas.height-170);
                    intGoX = RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                case 2:
                    intX = 0;
                    intY = RandomNextInt(theCanvas.height-170);
                    intGoX = RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                case 3:
                    intX = theCanvas.width-170;
                    intY = 0;
                    intGoX = -2 + RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                case 4:
                    intX = theCanvas.width-170;
                    intY = 0;
                    intGoX = -2 + RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                }
            arrBalls.push({x: intX, y:intY, go_x: intGoX, go_y: intGoY});
        }
        MoveBall();
        
    }
}

function MakeBall() {
    for(var i = 0; i <10; i++) {
        var BallType = RandomNextInt(4);
        var intX, intY, intGoX, intGoY;
        switch (BallType) {
                case 1:
                    intX = 0;
                    intY = RandomNextInt(theCanvas.height-170);
                    intGoX = RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                case 2:
                    intX = 0;
                    intY = RandomNextInt(theCanvas.height-170);
                    intGoX = RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                case 3:
                    intX = theCanvas.width-170;
                    intY = 0;
                    intGoX = -2 + RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                case 4:
                    intX = theCanvas.width-170;
                    intY = 0;
                    intGoX = -2 + RandomNextInt(2);
                    intGoY = -2 + RandomNextInt(4);
                    break;
                }
    }
}