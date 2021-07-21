// console.log("lets go");

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

// console.log(gameArea);
startScreen.addEventListener('click', start)
let player = { speed: 5, score: 0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function runlines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
// if players car collide then stop game
function endgame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final score is " + player.score + "<br>press here to restart the game.";
    player.score = true;
}

function enemy(car) {
    let enemy = document.querySelectorAll('.enemy');

    //for detecting collition of 2 cars
    enemy.forEach(function (item) {
        if (isCollide(car, item)) {
            // console.log("Boom");
            endgame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}
// Arrow keys functioning and score updating

function gamePlay() 
    // console.log('hey i am clicked');
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {

        runlines();
        enemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);

        player.score++;
        let ps = player.score - 2;
        score.innerText = "Score: " + ps;
    }
}
//  initializing Roadlines
   // To fluctuate class means, On clicking start game, User can start playing game. So i have used classlist to manipulate 'hide' func into 2 seperate divs using js.
function start() {
    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    window.requestAnimationFrame(gamePlay);  // this method is used for printing a object(gamePlay) infinite times by calling back itself.

     // created a new 'lines' div inside a existing 'gameArea' div using gameArea.AppendChild, with some CSS including for center road lines.
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

     // created a new car div inside a existing gameArea div using gameArea.AppendChild.
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //    car.innerText = ('lets goooo');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top position" + car.offsetTop);
    // console.log("left position" + car.offsetLeft);

       // created a new enemy div inside a existing gameArea div using gameArea.AppendChild, with some CSS including.
    for (x = 0; x < 4; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        enemycar.y = ((x + 1) * 350) * -1;
        enemycar.style.top = enemycar.y + "px";
        enemycar.style.backgroundColor = 'randomColor()';
        enemycar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemycar);
    }
}
// generating randon colors to enemy cars using [Math.floor and .tostring] methods
function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}
