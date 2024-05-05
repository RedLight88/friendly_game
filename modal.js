function showPromptIfNearSign() {
    const proximityThreshold = 50;
    if (sceneConfigurations[currentBackground] && sceneConfigurations[currentBackground].signPositions) {
        Object.values(sceneConfigurations[currentBackground].signPositions).forEach(sign => {
            const distance = Math.sqrt((charX - sign.x) ** 2 + (charY - sign.y) ** 2);
            if (distance < proximityThreshold) {
                const text = "E";
                const textSize = 30;
                ctx.font = `${textSize}px Arial`;
                ctx.fillStyle = "white";
                const textWidth = ctx.measureText(text).width;
                const textX = sign.x + 25 - (textWidth / 2);
                const textY = sign.y - 10;
                ctx.fillRect(textX - 5, textY - textSize, textWidth + 10, textSize + 10);
                ctx.fillStyle = "black";
                ctx.fillText(text, textX, textY);
            }
        });
    }
}

function findNearSign() {
    const proximityThreshold = 50;
    if (sceneConfigurations[currentBackground] && sceneConfigurations[currentBackground].signPositions) {
        for (const [key, sign] of Object.entries(sceneConfigurations[currentBackground].signPositions)) {
            const distance = Math.sqrt((charX - sign.x) ** 2 + (charY - sign.y) ** 2);
            if (distance < proximityThreshold) {
                return key;
            }
        }
    }
    return null;
}

function closeModal() {
    if (currentOverlay) {
        document.body.removeChild(currentOverlay);
        currentOverlay = null;
        isModalVisible = false;
    }
}

function displayModal(message) {
    // Overlay covering the entire viewport
    let overlay = document.createElement('div');
    overlay.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); z-index: 1000;';
    currentOverlay = overlay;

    // Modal container centered in the viewport
    let modal = document.createElement('div');
    modal.style = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; width: auto; min-width: 300px; max-width: 80%; border-radius: 10px; box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.3); z-index: 1001; font-weight: bold; font-size:25px; overflow-wrap: break-word;';

    // Message content
    let modalContent = document.createElement('div');
    modalContent.innerText = message;
    modalContent.style = 'margin-bottom: 20px;'; // Space for button
    modal.appendChild(modalContent);

    // Close button positioned directly below the modal content inside the modal container
    let closeButton = document.createElement('button');
    closeButton.innerText = "Close";
    closeButton.style = 'padding: 5px 10px; cursor: pointer; border: none; background-color: #f44336; color: white; border-radius: 5px; display: block; margin: 0 auto;'; // Centered below the content
    closeButton.onclick = closeModal;
    modal.appendChild(closeButton); // Add button inside the modal to keep it grouped with the content

    overlay.appendChild(modal); // Add the complete modal to the overlay
    document.body.appendChild(overlay); // Append the overlay to the body
    isModalVisible = true;
}

