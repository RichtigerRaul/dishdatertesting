let zutatenData = [];
let currentZutatenIndex = 0;
let likedZutaten = [];
let currentCategory = 'Snacks';

const BASE_URL = 'https://richtigerraul.github.io/dishdatertesting/';
const RAW_GITHUB_URL = 'https://raw.githubusercontent.com/RichtigerRaul/dishdatertesting/refs/heads/main/';
const PLACEHOLDER_IMAGE = `${RAW_GITHUB_URL}img/z/1.jpg`;

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
            zutatenData = filterOutSauceZutaten(zutatenData); // Filtere Sauce-Zutaten aus
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

function filterOutSauceZutaten(zutaten) {
    return zutaten.filter(zutat => !zutat.tags.includes('sauce'));
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
        loadImage(zutaten.img);
    }
}

function loadImage(imagePath) {
    const imgElement = document.getElementById('zutaten-image');
    
    imgElement.src = PLACEHOLDER_IMAGE;

    let fullImagePath;
    if (imagePath.startsWith('http')) {
        fullImagePath = imagePath;
    } else if (imagePath.startsWith('img/')) {
        fullImagePath = `${RAW_GITHUB_URL}${imagePath}`;
    } else {
        fullImagePath = `${BASE_URL}${imagePath}`;
    }

    console.log('Versuche Bild zu laden:', fullImagePath);

    imgElement.onload = function() {
        console.log('Bild erfolgreich geladen:', this.src);
    };
    
    imgElement.onerror = function() {
        console.error(`Fehler beim Laden des Bildes: ${fullImagePath}`);
        this.src = PLACEHOLDER_IMAGE;
    };
    
    imgElement.src = fullImagePath;
}

function addEventListeners() {
    document.getElementById('like-btn').addEventListener('click', () => handleZutaten(true));
    document.getElementById('dislike-btn').addEventListener('click', () => handleZutaten(false));
    document.getElementById('back-btn').addEventListener('click', () => goto('menu.html'));
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

document.addEventListener('DOMContentLoaded', addEventListeners);
