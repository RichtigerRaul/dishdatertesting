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
            // Extrahiere nur die Snack-Zutaten
            zutatenData = data.z.Mahlzeiten.Snacks.map(id => {
                for (let category in data.z.Kategorien) {
                    let zutat = data.z.Kategorien[category].find(item => item.id === id);
                    if (zutat) return zutat;
                }
            }).filter(zutat => zutat);

            // Mische die Zutaten zufällig
            shuffleArray(zutatenData);

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
}

function displayZutaten(index) {
    const zutaten = zutatenData[index];
    if (zutaten) {
        document.getElementById('zutaten-name').textContent = zutaten.name;
        document.getElementById('zutaten-tags').textContent = zutaten.tags.join(', ');
        loadImage(zutaten.img);
    }
}

function loadImage(src) {
    const img = new Image();
    const imgElement = document.getElementById('zutaten-image');
    const placeholder = 'img/placeholder.jpg';

    img.onload = function() {
        imgElement.src = this.src;
    };

    img.onerror = function() {
        console.error(`Fehler beim Laden des Bildes: ${src}`);
        imgElement.src = placeholder;
    };

    img.src = src;
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
        shuffleArray(zutatenData); // Mische die Zutaten neu, wenn alle durchgegangen wurden
    }
    displayZutaten(currentZutatenIndex);
}

function goto(page) {
    window.location.href = page;
}
