// JSON-Daten laden
let zutatenData = [];
let currentZutatenIndex = 0;

// Laden der Zutaten JSON-Daten
fetch('json/z.json')
    .then(response => response.json())
    .then(data => {
        zutatenData = data.z.Kategorien.Gemüse;
        displayZutaten(currentZutatenIndex);
    })
    .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));

// Funktion zum Anzeigen einer Zutat
function displayZutaten(index) {
    const zutaten = zutatenData[index];
    document.getElementById('zutaten-image').src = zutaten.img;
    document.getElementById('zutaten-name').textContent = zutaten.name;
    document.getElementById('zutaten-tags').textContent = zutaten.tags.join(', ');
}

// "Like"-Button Event Listener
document.getElementById('like-btn').addEventListener('click', () => {
    currentZutatenIndex++;
    if (currentZutatenIndex >= zutatenData.length) {
        currentZutatenIndex = 0;
    }
    displayZutaten(currentZutatenIndex);
});

// "Dislike"-Button Event Listener
document.getElementById('dislike-btn').addEventListener('click', () => {
    currentZutatenIndex++;
    if (currentZutatenIndex >= zutatenData.length) {
        currentZutatenIndex = 0;
    }
    displayZutaten(currentZutatenIndex);
});
