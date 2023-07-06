let currZombieTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play();
}

function setGame() {
    for (let i = 0; i < 12; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("canvas").appendChild(tile);
    }
    const cursor = document.querySelector(".cursor");

    window.addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";

    window.addEventListener("click", () => {
        cursor.style.animation = "hit 0.1s ease";
        setTimeout(() => {
        cursor.style.removeProperty("animation");
        }, 200);
    });
    });

    setInterval(setZombie, getRandomTime());
}

function getRandomTime() {
    const minSeconds = 1;
    const maxSeconds = 2.5;
    const randomSeconds = Math.random() * (maxSeconds - minSeconds) + minSeconds;
    return randomSeconds * 1000;
  }

function getRandomTile() {
    let randNum = Math.floor(Math.random() * 9);
    return randNum.toString();
}

function setZombie() {
    if (gameOver) {
        return;
    }
    if (currZombieTile) {
        currZombieTile.innerHTML = "";
    }
  
    const zombieImgs = [
        "./Wraith_01_Attack_000.png",
        "./Wraith_01_Attack_001.png",
        "./Wraith_01_Attack_002.png",
        "./Wraith_01_Attack_003.png",
        "./Wraith_01_Attack_004.png",
        "./Wraith_01_Attack_005.png",
        "./Wraith_01_Attack_006.png",
        "./Wraith_01_Attack_007.png",
        "./Wraith_01_Attack_008.png",
        "./Wraith_01_Attack_009.png",
        "./Wraith_01_Attack_010.png",
        "./Wraith_01_Attack_011.png",
    ];
    let currentImgIndex = 0;
    let zombie = document.createElement("img");
    zombie.health = 3; // set health property to 3 for each new zombie
    zombie.src = zombieImgs[currentImgIndex];

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currZombieTile = document.getElementById(num);
    currZombieTile.appendChild(zombie);

    const intervalId = setInterval(() => {
        currentImgIndex++;
        if (currentImgIndex >= zombieImgs.length) {
            currentImgIndex = 0;
        }
        zombie.src = zombieImgs[currentImgIndex];
    }, 50);

    setTimeout(() => {
        clearInterval(intervalId);
        currZombieTile.innerHTML = "";
    }, 1500);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currZombieTile && currZombieTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currZombieTile) {
        currZombieTile.firstChild.health -= 1; // decrease zombie's health by 1
        if (currZombieTile.firstChild.health === 0) { // check if health reaches 0
            score += 10;
            document.getElementById("score").innerText = score.toString(); // update score html
        }
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // update score html
        gameOver = true;
    }
}
