const emoji = document.getElementById("emoji");
const gameStartModal = document.querySelector(".game-start"); 
const scoreValue = document.getElementById("score-value"); 
const hearts = document.querySelector(".hearts"); 
let score, lives, active, width, height; 
let intervalID; 

emoji.addEventListener("click", addScore);

document.getElementById("yes").addEventListener("click", function(){initialGame(); bgSound();});

document.getElementById("no").addEventListener("click", () => {
    const message = document.querySelector(".game-start p");
    message.textContent = "You have no business here. Please Leave 😠"; 
    message.style.color = "black"; 
    document.querySelector(".game-start > .btn-grp").style.display = "none"; 
});

document.getElementById("quit").addEventListener("click", quitGame); 


function initialGame(){
    score = 0; 
    lives = 5; 
    active = 0; 
    width = window.innerWidth; 
    height = window.innerHeight; 
    gameStartModal.style.visibility = "hidden";
    document.querySelector(".game-state").style.visibility = "visible";
    runGame(); 
    scoreValue.textContent = "00"; 
    hearts.textContent = "❤️❤️❤️❤️❤️"; 
}

function bgSound(){
    let bgSound = new Audio('./assets/bgSound.mp3'); 
    bgSound.play(); 
    bgSound.loop = true; 
}

function addScore() {
    score++;
    scoreValue.textContent = score <= 9 ? "0" + score : score; 
    let music = new Audio('./assets/punch.wav');
    music.play(); 
}

function runGame() {
    width *= 0.6; 
    height *= 0.5; 
    intervalID = setInterval(() => {
        active++;
        let x = Math.floor(Math.random() * width + 1);
        let y = Math.floor(Math.random() * height + 1);
        emoji.style.transform = `translate(${x}px, ${y}px)`;

        if(lives === 0){
            quitGame(); 
        }
        
        lives = 5 - (active - score); 
        hearts.textContent = ""; 
        for(let i = 0; i < lives; i++){
            hearts.textContent += "❤️"; 
        }
        
    }, 950);
}

function quitGame() {
    clearInterval(intervalID); 
    document.querySelector(".game-state").style.visibility = "hidden"; 
    
    gameStartModal.textContent = "GAME OVER!!!"; 
    gameStartModal.style.fontFamily = "Bebas Neue";
    gameStartModal.style.color = "#ba181b";
    gameStartModal.style.fontSize = "44px"; 
    gameStartModal.style.visibility = "visible"; 

    let scoreEl = document.createElement("p"); 
    scoreEl.textContent = `Score: ${score}`; 
    gameStartModal.appendChild(scoreEl); 

    let playAgain = document.createElement("button"); 
    playAgain.textContent = "Play Again!"; 
    playAgain.style.backgroundColor = "#004b23"; 
    playAgain.setAttribute("id", "play-again"); 
    gameStartModal.appendChild(playAgain); 

    document.getElementById("play-again").addEventListener("click", initialGame); 

}

