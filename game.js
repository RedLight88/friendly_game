const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

let charX = canvas.width / 2;
let charY = canvas.height / 2; // Start the character at the center of the farm scene
let speed = 5;
let direction = 'right'; // Initial direction

const charSprite = new Image();
charSprite.src = 'char.png'; // Path to the character sprite
const backgrounds = {
    'farm': 'farm_background.png',
    'sunny': 'sunny_background.png',
    'city' : 'city_background.png'
};
let currentBackground = 'farm';

canvas.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;

function changeBackground(newBackground) {
    currentBackground = newBackground;
    canvas.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
}

function handleCityLimits() {
    if (currentBackground === 'city') {
        charY = Math.min(charY, canvas.height * 0.4); // Limit upwards movement to 40% of the canvas height
    }
}

function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.save();
    if (direction === 'left') {
        ctx.scale(-1, 1); // Flip the image horizontally
        ctx.drawImage(charSprite, -(charX + 32), charY, 32, 64);
    } else {
        ctx.drawImage(charSprite, charX, charY, 32, 64);
    }
    ctx.restore();

    // Check boundaries for changing backgrounds
    if (charY <= 0 && currentBackground === 'farm') {
        changeBackground('sunny');
        charY = canvas.height - 64; // Place character at the bottom of the sunny background
    } else if (charY >= canvas.height - 64 && currentBackground === 'sunny') {
        changeBackground('farm');
        charY = 0; // Place character at the top of the farm background
    }

    if (charX <=0 && currentBackground === 'farm') {
        changeBackground('city');
        charX = canvas.width - 32; // Place character on the right side of the city background
        charY = canvas.height * 0.6; // Start somewhat centered vertically but with room to move up
    }
    
    handleCityLimits();
}


document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowRight':
            direction = 'right';
            charX += speed;
            break;
        case 'ArrowLeft':
            direction = 'left';
            charX -= speed;
            break;
        case 'ArrowUp':
            if (!(currentBackground === 'sunny' && charY <= canvas.height - 300)) { // Prevent reaching the sky in sunny background
                charY -= speed;
            }
            break;
        case 'ArrowDown':
            charY += speed;
            break;
    }
});

function updateGame() {
    drawCharacter();
    requestAnimationFrame(updateGame);
}

updateGame();
