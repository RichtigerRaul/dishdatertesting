let zutatenData = [];
let currentZutatenIndex = 0;

// JSON-Daten laden
window.onload = function () {
    fetch('json/z.json')  // Stelle sicher, dass dieser Pfad korrekt ist
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            zutatenData = data.z.Kategorien.Gemüse;  // Stelle sicher, dass die Struktur passt
            displayZutaten(currentZutatenIndex);
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));
};

// Funktion zum Anzeigen einer Zutat
function displayZutaten(index) {
    const zutaten = zutatenData[index];
    document.getElementById('zutaten-image').src = img/z/1.jpg;
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
