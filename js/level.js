//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BG_COLOR = 'black';

// Lives
let numLives = 3;
let gameOver = false; 
let status;

const BRICK_COLOR = '#1eddff';
const BRICK_HEIGHT = 25;
const BRICK_WIDTH = 60;

const INITIAL_COORDINATES = [
    { x: 30, y: 30 },
    { x: 110, y: 30 },
    { x: 190, y: 30 },
    { x: 270, y: 30 },
    { x: 350, y: 30 },
    { x: 430, y: 30 },
    { x: 510, y: 30 },
    { x: 30, y: 70 },
    { x: 110, y: 70 },
    { x: 190, y: 70 },
    { x: 270, y: 70 },
    { x: 350, y: 70 },
    { x: 430, y: 70 },
    { x: 510, y: 70 },
    { x: 30, y: 110 },
    { x: 110, y: 110 },
    { x: 190, y: 110 },
    { x: 270, y: 110 },
    { x: 350, y: 110 },
    { x: 430, y: 110 },
    { x: 510, y: 110 },
    { x: 30, y: 150 },
    { x: 110, y: 150 },
    { x: 190, y: 150 },
    { x: 270, y: 150 },
    { x: 350, y: 150 },
    { x: 430, y: 150 },
    { x: 510, y: 150 }
];

let coordinates = [...INITIAL_COORDINATES];

const mainGame = () => {
    if (!gameOver) {
        updatePaddlePosition();
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BALL_COLOR;
        ctx.fillRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = BRICK_COLOR;

        // Bricks display
        coordinates.map((elem, index) => {
            if (checkBrickBallCollision(elem)) {
                coordinates.splice(index, 1);
                ball_XV = ball_XV;
                ball_YV = -ball_YV;
            } else {
                ctx.fillRect(elem.x, elem.y, BRICK_WIDTH, BRICK_HEIGHT);
            }
        });

        if (coordinates.length === 0) {
            status = 'You have Won';
            gameOver = true;
        }


        ctx.fillStyle = BALL_COLOR;
        updateBallPosition();
        ctx.beginPath();
        ctx.arc(ball_X, ball_Y, BALL_DIA / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = BG_COLOR;
        ctx.font = '16px Arial';
        ctx.fillText(
            'Lives : ' + numLives,
            paddle_X + PADDLE_WIDTH / 6,
            PADDLE_Y + PADDLE_HEIGHT - 2
        );
    } else {
        ctx.fillStyle = BRICK_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BG_COLOR;
        ctx.font = '60px Arial';
        ctx.fillText(status, 112, 150);
        ctx.fillStyle = '#474747';
        ctx.font = '20px Arial';
        ctx.fillText('Click to Play Again', canvas.width / 2 - 100, 250);
    }
};

// Reset game with previous info
const lifeLossReset = () => {
    paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;
    ball_XV = -5;
    ball_YV = -5;
    ball_Y = PADDLE_Y - BALL_DIA / 2;
    ball_X = paddle_X + PADDLE_WIDTH / 2;
    gameOver = false;
    ballplayerconnect = true;     
}; //gameReset


const gameOverReset = () => {
    coordinates = [...INITIAL_COORDINATES];
    lifeLossReset();
    numLives = 3;
};