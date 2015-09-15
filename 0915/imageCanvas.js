window.addEventListener("load", drawScreen, true);

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	//렌더링 컨텍스트 : 2d, 3d
	Context.fillStyle = "#F9D423";
	Context.fillRect(0,0,1000,700);
}
