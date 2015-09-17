window.addEventListener("load", drawScreen, true);

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	//렌더링 컨텍스트 : 2d, 3d
	//배경색채우기
	Context.fillStyle = "#F9D423";
	Context.fillRect(0,0,1000,700);
	
	//선긋기
	Context.beginPath();
	Context.moveTo(10,10);
	Context.lineTo(150,100);
	Context.strokeStyle="#000";
	Context.stroke();

	//반원그리기
	Context.beginPath();
	Context.arc(200,30,50,1*Math.PI,2*Math.PI,true);
	//시작점(x,y),반지름,시작각도,끝각도,반시계방향
	Context.fillStyle="#ff0"
	Context.fill();
	
	//해적기만들기
	var gradient = Context.createLinearGradient(280,7,80,100);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");

	//Fill with gradient
	Context.strokeStyle = gradient;
	Context.lineWidth = 5;
	Context.strokeRect(280,7,80,100);

	
}
