let user = [];
let game = [];
let btns = ["red", "yellow", "green", "blue"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!start) {
        console.log("Game is started");
        start = true;
        level = 0;
        game = [];
        user = [];
        levelup();
    }
});



function flashbtn(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 150);
}

function usrflashbtn(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 150);
}

function levelup() {
    user = []; // Reset user input for the new level
    level++;
    h2.innerText = `Level ${level}`;
    let randomindx = Math.floor(Math.random() * 4); // include 3
    let randomclr = btns[randomindx];
    let randmbtn = document.querySelector(`.${randomclr}`);
    flashbtn(randmbtn);
    game.push(randomclr);
    console.log("Game pattern:", game);
}

function checkAns(index) {
    if (user[index] === game[index]) {
        if (user.length === game.length) {
            setTimeout(levelup, 250);
        }
    } else {
        h2.innerHTML = `Game over! Press any key to restart <br><br> Your score was ${level}`;
        document.body.classList.add("game-over");

        setTimeout(() => document.body.classList.remove("game-over"), 200);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 350);
        highestScore();
        resetGame();
    }
}

function highestScore() {
    let high = localStorage.getItem("highscore") || 0;

    if (level > high) {
        localStorage.setItem("highscore", level);
        high = level;
    }

    let h4 = document.querySelector("h4");
    h4.innerText = `Highest score is: ${high}`;
}


function resetGame() {
    start = false;
    game = [];
    user = [];
    level = 0;
}

function buttonpress() {
    if (!start) return; // Don't allow clicks if game hasn't started

    let btn = this;
    usrflashbtn(btn);
    let userclr = btn.getAttribute("id");
    user.push(userclr);
    console.log("User pattern:", user);

    checkAns(user.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", buttonpress);
}