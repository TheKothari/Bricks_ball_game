var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx=-2;
var dy=-2;
var ballradius=10;
var paddleHeight = 15;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score =0;
var score1=document.getElementById("score");
var audio = $("#bounce")[0];


var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler (butt)
{
	if(butt.keyCode==39)
		{
			rightPressed=true;
		}
	else if(butt.keyCode==37)
		{
			leftPressed=true;
		}
	
}

function keyUpHandler (butt)
{
	if(butt.keyCode==39)
		{
			rightPressed=false;
		}
	else if(butt.keyCode==37)
		{
			leftPressed=false;
		}
	
}




function drawScore() {
    
	score1.innerHTML="Score: "+score;
}


function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballradius, 0, Math.PI*2);
    ctx.fillStyle = "#76323F";
    ctx.fill();
    ctx.closePath();
}

function draw() 
{
   
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBricks();
		drawBall();
		drawPaddle();
		collisionDetection();
		drawScore();


		if(x + dx > canvas.width-ballradius || x + dx < ballradius) 
		{
			dx = -dx;
		}

		if( y + dy < ballradius)
		{
			dy = -dy;
		}
		else if(y + dy > canvas.height-ballradius)
				{
					if (x+dx>paddleX && x+dx<paddleX+paddleWidth)
						dy = -dy;

					else
						{
							//alert("Lol you suck at this");
							document.location.reload();
						}
				}




		if(rightPressed && paddleX < canvas.width-paddleWidth)
		{
			paddleX+=8;
		}
		if(leftPressed && paddleX > 0)
		{
			paddleX-=8;
		}

		x += dx;
		y += dy;
		requestAnimationFrame(draw);
	

}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#76323F" ;
	ctx.fill();
	ctx.closePath();
	
}

function drawBricks() {
    for(c=0; c< brickColumnCount; c++) {
        for(r=0; r < brickRowCount; r++) {
			if(bricks[c][r].status==1)
			{
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#76323F";
				ctx.fill();
				ctx.closePath();
			}
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status==1)
				{
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) 
					{
						audio.play(); 
						dy = -dy;
						b.status=0;
						score++;
						
						if(score==brickRowCount*brickColumnCount)
							{
								alert("You won it buddy");
								document.location.reload();
							}
					}
				}
        }
    }
}

draw();

