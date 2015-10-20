window.addEventListener("keydown", onkeydown, false);
window.addEventListener("keyup", onkeyup, false);

var theCanvas;
var Context;

theCanvas = document.getElementById("GameCanvas");
Context = theCanvas.getContext("2d");

var PlayerA = {
    x: 200
};

var PlayerB = {
    x: 800
};



var Game_STATE_READY = 0;
var Game_STATE_GAME = 1;
var Game_STATE_OVER = 2;
var GameState = Game_STATE_READY;

var intervalID;

var ball = {
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0
};

function drawScreen() {
    Context.drawImage(imgBackground, 0, 0, 1024, 600);

    /* 게임 상태 */
    switch (GameState) {
    case Game_STATE_READY:
        Context.font = '50px Comic Sans MS';
        Context.fillText("Ready!", 512, 300);
        Context.textAlign = "center"
        break;

    case Game_STATE_GAME:
        Context.drawImage(imgPlayer, PlayerA.x, 600 - 170, 170, 170);
        Context.drawImage(imgPlayer, PlayerB.x, 600 - 170, 170, 170);
        Context.drawImage(imgBall, ball.x, ball.y, 100, 100);
        break;

    case Game_STATE_OVER:
        Context.font = '50px Comic Sans MS';
        Context.fillText("Game Over", 512, 300);
        Context.textAlign = "center";
        break;

    }

}

function update() {
    ball.x += ball.deltaX;
    ball.y += ball.deltaY;
    ball.deltaY += 0.2;

    if (isAdown == true) PlayerA.x -= 20;
    else if (isDdown == true) PlayerA.x += 20;
    if (isLEFTdown == true) PlayerB.x -= 20;
    else if (isRIGHTdown == true) PlayerB.x += 20;

    if (ball.y + 100 > 600) onGameOver();
    
    if(isCrashBall(PlayerA)){
        ball.deltaY=-10;
        ball.deltaX = Math.random() * 20 - 10;
    }
    if(isCrashBall(PlayerB)) {
        ball.deltaY=-10;
        ball.deltaX = Math.random() * 20 - 10;
    }

    if(ball.x < 0 || ball.x > 1024-100) {
        ball.deltaX*=-1;
    }

    drawScreen();
}





var isAdown = false;
var isDdown = false;
var isLEFTdown = false;
var isRIGHTdown = false;

function onkeydown(e) {
    if (e.keyCode == 65) isAdown = true;
    if (e.keyCode == 68) isDdown = true;
    if (e.keyCode == 37) isLEFTdown = true;
    if (e.keyCode == 39) isRIGHTdown = true;

    if (e.keyCode == 13 && GameState != Game_STATE_GAME) onGameStart();
}

function onkeyup(e) {
    console.log(e.keyCode);
    if (e.keyCode == 65) isAdown = false;
    if (e.keyCode == 68) isDdown = false;
    if (e.keyCode == 37) isLEFTdown = false;
    if (e.keyCode == 39) isRIGHTdown = false;
}

function onGameStart() {

    intervalID = setInterval(update, 1000 / 60);

    soundMusic = new Audio();
    soundMusic.src = "sound/background.mp3"
    soundMusic.loop = true;
    document.body.appendChild(soundMusic);

    shootEffect = new Audio();
    shootEffect.src = "sound/gameStart.mp3"
    document.body.appendChild(shootEffect);

    soundMusic.play();

    GameState = Game_STATE_GAME;


}


function isCrashBall(player) {
   return (
       player.x < ball.x + 100 &&
       player.x + 170 > ball.x &&
       600 - 170 < ball.y + 100 &&
       600 > ball.y
   );
}

function onGameOver() {
    GameState = Game_STATE_OVER;
    clearInterval(intervalID);
    soundMusic.pause();
    soundMusic.src = "sound/gameOver.mp3";
    soundMusic.loop = false;
    soundMusic.play();
}