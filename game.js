let canTransition = true; // Global flag to control when transitions can occur
const transitionCooldown = 500; // 500 milliseconds cooldown



function handleBackgroundTransition() {
    if (!canTransition) return; // Skip transition logic if on cooldown

    const transitions = sceneConfigurations[currentBackground].transitions;
    let transitionOccurred = false;

    if (charX > canvas.width - 50 && transitions.right) {
        currentBackground = transitions.right;
        charX = 0;
        transitionOccurred = true;
    } else if (charX < 50 && transitions.left) {
        currentBackground = transitions.left;
        charX = canvas.width - 50;
        transitionOccurred = true;
    }

    if (charY < 50 && transitions.up) {
        currentBackground = transitions.up;
        charY = canvas.height - 50;
        transitionOccurred = true;
    } else if (charY > canvas.height - 50 && transitions.down) {
        currentBackground = transitions.down;
        charY = 0;
        transitionOccurred = true;
    }

    if (transitionOccurred) {
        if (currentBackground === 'birth') {
            setInitialPositionForBirthScene(); // Set the starting position for the birth scene
        }
        adjustPositionForSceneEntry();
        updateBackground();
        canTransition = false; // Start cooldown
        setTimeout(() => {
            canTransition = true; // End cooldown
        }, transitionCooldown);
    }
}




function adjustPositionForSceneEntry() {
    const rightEdge = canvas.width;
    const bottomEdge = canvas.height;

    // Check the current background and adjust position accordingly
    if (currentBackground === 'city') {
        // Place character at the bottom-right corner for the city scene
        charX = rightEdge - 32;  // Assuming the character width is 32 pixels
        charY = bottomEdge - 64; // Assuming the character height is 64 pixels
    }

    // Add additional conditions for other scenes if necessary
    // For example, if entering a 'forest' scene, place character at top-left:
    // if (currentBackground === 'forest') {
    //     charX = 0;
    //     charY = 0;
    // }
    updateGame();
    console.log(`Character has been positioned at (${charX}, ${charY}) for the ${currentBackground} scene.`);
}


    




// Function to update background image and resize handling
function updateBackground() {
    canvas.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
    canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
    drawSigns(); // Re-draw signs for the new background
}

// Function to restrict character's movement within the canvas boundaries
// Function to restrict character's movement within the canvas boundaries
function limitMovementWithinBounds() {
    const rightEdge = canvas.width;
    const leftEdge = 0;
    const topEdge = 0;
    const bottomEdge = canvas.height;

    // Check and adjust if character tries to move beyond the right boundary
    if (charX > rightEdge - 32) {  // Assuming the character width is 32 pixels
        charX = rightEdge - 32;
    }
    // Check and adjust if character tries to move beyond the left boundary
    if (charX < leftEdge) {
        charX = leftEdge;
    }
    // Check and adjust if character tries to move beyond the top boundary
    if (charY < topEdge) {
        charY = topEdge;
    }
    // Check and adjust if character tries to move beyond the bottom boundary
    if (charY > bottomEdge - 64) {  // Assuming the character height is 64 pixels
        charY = bottomEdge - 64;
    }
}
// Function to restrict character's movement within the canvas boundaries
function limitMovementWithinBounds() {
    const rightEdge = canvas.width;
    const leftEdge = 0;
    const topEdge = 0;
    const bottomEdge = canvas.height;

    // Check and adjust if character tries to move beyond the right boundary
    if (charX > rightEdge - 32) {  // Assuming the character width is 32 pixels
        charX = rightEdge - 32;
    }
    // Check and adjust if character tries to move beyond the left boundary
    if (charX < leftEdge) {
        charX = leftEdge;
    }
    // Check and adjust if character tries to move beyond the top boundary
    if (charY < topEdge) {
        charY = topEdge;
    }
    // Check and adjust if character tries to move beyond the bottom boundary
    if (charY > bottomEdge - 64) {  // Assuming the character height is 64 pixels
        charY = bottomEdge - 64;
    }
}

function restrictMovementInBirthScene() {
    const topY = 0; // Top of the canvas
    const bottomY = canvas.height; // Bottom of the canvas
    const centerX = canvas.width / 2;

    // Calculate dynamic X boundaries based on current Y position
    const relativeYPosition = (charY - topY) / (bottomY - topY); // Normalize Y position from 0 to 1
    const minX = centerX - (centerX * relativeYPosition); // Linearly interpolate X from centerX at top to 0 at bottom
    const maxX = centerX + (centerX * relativeYPosition); // Linearly interpolate X from centerX at top to canvas width at bottom

    // Apply restrictions
    if (charX < minX) {
        charX = minX; // Constrain to left boundary
    } else if (charX > maxX) {
        charX = maxX; // Constrain to right boundary
    }
    
    if (charY < topY) {
        charY = topY; // Optional: Constrain to top boundary
    } else if (charY > bottomY) {
        charY = bottomY; // Optional: Constrain to bottom boundary
    }
}function restrictMovementInBirthScene() {
    const topY = 0; // Top of the canvas
    const bottomY = canvas.height; // Bottom of the canvas
    const centerX = canvas.width / 2;

    // Calculate dynamic X boundaries based on current Y position
    const relativeYPosition = (charY - topY) / (bottomY - topY); // Normalize Y position from 0 to 1
    const minX = centerX - (centerX * relativeYPosition); // Linearly interpolate X from centerX at top to 0 at bottom
    const maxX = centerX + (centerX * relativeYPosition); // Linearly interpolate X from centerX at top to canvas width at bottom

    // Apply restrictions
    if (charX < minX) {
        charX = minX; // Constrain to left boundary
    } else if (charX > maxX) {
        charX = maxX; // Constrain to right boundary
    }
    
    if (charY < topY) {
        charY = topY; // Optional: Constrain to top boundary
    } else if (charY > bottomY) {
        charY = bottomY; // Optional: Constrain to bottom boundary
    }
}


function setInitialPositionForBirthScene() {
    // Assuming the center and slightly below the top
    charX = canvas.width / 2; // Center of the canvas width
    charY = canvas.height * 0.10; // Slightly below the top (10% down the canvas height)

    console.log(`Character set at (${charX}, ${charY}) for the 'birth' scene.`);
}


function limitHeightInCityScene() {
    const minHeight = 500;  // The minimum Y-coordinate the character can reach
    const maxHeight = 1000;  // The maximum Y-coordinate the character can reach

    if (charY < minHeight) {
        charY = minHeight;  // Set character Y to minHeight if it goes too low
    } else if (charY > maxHeight) {
        charY = maxHeight;  // Set character Y to maxHeight if it goes too high
    }
}


function placeCharacterAtSpot() {
    
    const charImage = new Image();
    charImage.src = 'sebi.png';  // Path to your character sprite image

    charImage.onload = function() {
        // Draw the image at the calculated position
        // Subtract half the width and height of the image to center it at the spot
        ctx.drawImage(charImage, 1075 - charImage.width / 2, 691 - charImage.height / 2);
    };
}


