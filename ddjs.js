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
            // Nur Snacks-Zutaten auswählen
            zutatenData = data.z.Mahlzeiten.Snacks.map(id => {
                // Suche die Zutat mit der entsprechenden ID
                for (let category in data.z.Kategorien) {
                    let zutat = data.z.Kategorien[category].find(item => item.id === id);
                    if (zutat) return zutat;
                }
            }).filter(zutat => zutat); // Entferne undefined Elemente

            displayZutaten(currentZutatenIndex);
            addEventListeners();
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));
};

function displayZutaten(index) {
    const zutaten = zutatenData[index];
    if (zutaten) {
        document.getElementById('zutaten-image').src = zutaten.img;
        document.getElementById('zutaten-name').textContent = zutaten.name;
        document.getElementById('zutaten-tags').textContent = zutaten.tags.join(', ');
    }
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
    }
    displayZutaten(currentZutatenIndex);
}

function goto(page) {
    window.location.href = page;
}
