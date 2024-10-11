let zutatenData = [];
let currentZutatenIndex = 0;
let likedZutaten = [];

window.onload = function () {
    fetch('json/z.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            // Alle Kategorien in ein Array zusammenführen
            zutatenData = Object.values(data.z.Kategorien).flat();
            // Zufällig mischen
            zutatenData = shuffleArray(zutatenData);
            displayZutaten(currentZutatenIndex);
            addEventListeners();
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayZutaten(index) {
    const zutaten = zutatenData[index];
    const imagePath = zutaten.img || 'img/placeholder.jpg'; // Fallback-Bild
    document.getElementById('zutaten-image').src = imagePath;
    document.getElementById('zutaten-name').textContent = zutaten.name;
    document.getElementById('zutaten-tags').textContent = zutaten.tags.join(', ');
}

function addEventListeners() {
    document.getElementById('like-btn').addEventListener('click', () => handleZutaten(true));
    document.getElementById('dislike-btn').addEventListener('click', () => handleZutaten(false));
}

function handleZutaten(liked) {
    if (liked) {
        likedZutaten.push(zutatenData[currentZutatenIndex]);
        console.log('Gelikte Zutaten:', likedZutaten);
    }
    nextZutaten();
}

function nextZutaten() {
    currentZutatenIndex++;
    if (currentZutatenIndex >= zutatenData.length) {
        currentZutatenIndex = 0;
        zutatenData = shuffleArray(zutatenData); // Neu mischen, wenn alle durch sind
    }
    displayZutaten(currentZutatenIndex);
}

function goto(page) {
    window.location.href = page;
}
