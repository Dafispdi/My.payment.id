window.onload = function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');

    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        backgroundMusic.play();
    }, 3000);
};

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    });
}

function zoomText(elementId) {
    const textElement = document.getElementById(elementId);
    textElement.style.fontSize = '2em'; // Zoom in
}

function downloadText(elementId) {
    const text = document.getElementById(elementId).innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = elementId + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}