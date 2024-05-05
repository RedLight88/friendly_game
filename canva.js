const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateBackgroundSize();
    drawCharacter();
});
const backgrounds = {
    'farm': 'farm_background.png',
    'sunny': 'sunny_background.png',
    'city': 'city_background.png',
    'birth': 'birth_background.png'
};

let currentBackground = 'farm';
canvas.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;


function updateBackgroundSize() {
    canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
}

function drawSigns() {
    if (sceneConfigurations[currentBackground] && sceneConfigurations[currentBackground].signPositions) {
        Object.values(sceneConfigurations[currentBackground].signPositions).forEach(sign => {
            ctx.drawImage(signImage, sign.x, sign.y, 50, 50);
        });
    }
}


const charSprite = new Image();
charSprite.src = 'char.png';  // Update path as necessary

const signImage = new Image();
signImage.src = 'sign.png';  // Update path as necessary




function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    if (direction === 'left') {
        ctx.scale(-1, 1);
        ctx.drawImage(charSprite, -(charX + 32), charY, 32, 64);
    } else {
        ctx.drawImage(charSprite, charX, charY, 32, 64);
    }
    ctx.restore();
}


function updateGame() {
    requestAnimationFrame(updateGame);
    if(backgrounds==='city'){
        placeCharacterAtSpot();
    }
    drawCharacter();
    drawSigns();
    showPromptIfNearSign();
}
updateGame();