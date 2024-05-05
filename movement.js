
document.addEventListener('keydown', function(event) {
    if (isModalVisible) {
        if (event.key === 'Escape') {
            closeModal();
        }
        return; // Ignore other keys while modal is visible
    }

    switch (event.key) {
        case 'd':
            direction= 'right';
            charX += speed;
            break;
        case 'a':
            direction = 'left';
            charX -= speed;
            break;
        case 'w':
            charY -= speed;
            break;
        case 's':
            charY += speed;
            break;
        case 'E':
        case 'e':
            const signKey = findNearSign();
            if (signKey) {
                const message = sceneConfigurations[currentBackground].modalMessages[signKey] || "No message for this sign.";
                displayModal(message);
                isModalVisible = true;
            }
            break;
    }
    handleBackgroundTransition();
    if (currentBackground === 'city') {
        limitHeightInCityScene();  // Limit height in the city scene
    }
    if (currentBackground === 'birth') {
        restrictMovementInBirthScene();  // Ensure this is called only in the 'birth' scene
    }
    
    limitMovementWithinBounds();
    updateGame();
});