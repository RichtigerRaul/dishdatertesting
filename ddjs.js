let zutatenData = [];
let currentZutatenIndex = 0;

window.onload = function () {
    fetch('json/z.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            zutatenData = data.z.Kategorien.Gemüse;
            displayZutaten(currentZutatenIndex);
            addEventListeners();
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));
};

function displayZutaten(index) {
    const zutaten = zutatenData[index];
    // Überprüfen Sie, ob das imagePath-Feld existiert, ansonsten verwenden Sie einen Standardpfad
    const imagePath = zutaten.imagePath || `img/z/${index + 1}.jpg`;
    document.getElementById('zutaten-image').src = imagePath;
    document.getElementById('zutaten-name').textContent = zutaten.name;
    document.getElementById('zutaten-tags').textContent = zutaten.tags.join(', ');
}

function addEventListeners() {
    document.getElementById('like-btn').addEventListener('click', nextZutaten);
    document.getElementById('dislike-btn').addEventListener('click', nextZutaten);
}

function nextZutaten() {
    currentZutatenIndex++;
    if (currentZutatenIndex >= zutatenData.length) {
        currentZutatenIndex = 0;
    }
    displayZutaten(currentZutatenIndex);
}

function goto(page) {
    window.location.href = page;
}
