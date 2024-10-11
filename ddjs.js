let zutatenData = [];
let currentZutatenIndex = 0;
let likedZutaten = [];
let currentCategory = 'Snacks';

const BASE_URL = 'https://richtigerraul.github.io/dishdatertesting/';

window.onload = function () {
    fetch(`${BASE_URL}json/z.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            zutatenData = getZutatenForCategory(data, currentCategory);
            shuffleArray(zutatenData);
            displayZutaten(currentZutatenIndex);
            addEventListeners();
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));
};

function getZutatenForCategory(data, category) {
    return data.z.Mahlzeiten[category].map(id => {
        for (let cat in data.z.Kategorien) {
            let zutat = data.z.Kategorien[cat].find(item => item.id === id);
            if (zutat) return zutat;
        }
    }).filter(zutat => zutat);
}

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
        document.getElementById('zutaten-image').src = zutaten.img;
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
        shuffleArray(zutatenData);
    }
    displayZutaten(currentZutatenIndex);
}

function goto(page) {
    window.location.href = `${BASE_URL}${page}`;
}
