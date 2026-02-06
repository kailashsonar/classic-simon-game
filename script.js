const buttons = document.querySelectorAll(".clickdiv");
const lvlHeading = document.querySelector(".lvl-heading");
const body = document.body;

const colors = ["red", "blue", "green", "orange"];

const gameState = {
    gameSequence: [],
    userSequence: [],
    level: 0,
    start: false
};

function startGame() {
    gameState.start = true;
    gameState.level = 0;
    gameState.gameSequence = [];
    lvlUp();
}

function lvlUp() {
    gameState.userSequence = [];
    gameState.level++;
    lvlHeading.textContent = `Level ${gameState.level}`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    gameState.gameSequence.push(randomColor);
    flashButton(randomColor);
}

function flashButton(color) {
    const btn = document.querySelector(`.${color}`);
    btn.classList.add("flashC");
    setTimeout(() => {
        btn.classList.remove("flashC");
    }, 300);
}

function flashUser(btn) {
    btn.classList.add("flashU");
    setTimeout(() => {
        btn.classList.remove("flashU");
    }, 150);
}

function checkInput(index) {
    if (gameState.userSequence[index] !== gameState.gameSequence[index]) {
        return gameOver();
    }

    if (gameState.userSequence.length === gameState.gameSequence.length) {
        setTimeout(lvlUp, 500);
    }
}

function gameOver() {
    body.classList.add("red");
    setTimeout(() => {
        body.classList.remove("red");
    }, 300);

    lvlHeading.textContent = `Game Over! At Level ${gameState.level}. Press any key to restart.`;
    gameState.start = false;
}

document.addEventListener("keydown", () => {
    if (!gameState.start) startGame();
});

buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        if (!gameState.start) return;

        gameState.userSequence.push(this.id);
        flashUser(this);
        checkInput(gameState.userSequence.length - 1);
    });
});
