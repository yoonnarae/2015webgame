window.addEventListener("load",drawScreen,false);
window.addEventListener("keydown",onkeydown,false);
window.addEventListener("keyup",onkeyup,false);
window.addEventListener("mousemove",onMouseMove,false);
window.addEventListener("mousedown",onMouseDown,false);
window.addEventListener("mouseup",onMouseUp,false);

var strKeyEventType = "none";
var strKeyEventValue = "none";

var bMouseClicked = false;
intMouseX = 480;
intMouseY = 300;
var strMouseStatus = "준비중";

var imgBackground = new Image();
imgBackground.src = "background.png";
var imgPlayer = new Image();
imgPlayer.src = "player.png";

imgPlayer.addEventListener("load",drawScreen,false);

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground,0,0,1000,700);
	Context.drawImage(imgPlayer,440,200,140,220);

	/*텍스트 그리기
	Context.fillStyle = "#000";
	Context.font = "24px nanumgothic";
	Context.textBaseline = "top";
	Context.fillText("입력된 키는 : " + strKeyEventValue, 5, 5);
	Context.fillText("키 입력상태는 : " + strKeyEventType, 5 ,30);
	*/

	/* 마우스 움직이기 */
	Context.fillStyle = "#ff0";
	Context.fillRect(0, 0, 1024, 600);
	Context.drawImage(imgPlayer, intMouseX, intMouseY, 140, 220);
	Context.filStyle = "#000";
	Context.font = "24px nanumgothic";
	Context.textBaseline - "top";
	Context.fillText("발생한 마우스 이벤트는 : " + strMouseStatus, 5, 5);

}

function onkeydown(e) {
	strKeyEventType = e.type;
	if(e.keyCode)code = e.keyCode;
	strKeyEventValue = code;
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