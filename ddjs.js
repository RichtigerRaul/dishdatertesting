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
            zutatenData = data.z.Mahlzeiten.Snacks.map(id => {
                for (let category in data.z.Kategorien) {
                    let zutat = data.z.Kategorien[category].find(item => item.id === id);
                    if (zutat) return zutat;
                }
            }).filter(zutat => zutat);

            displayZutaten(currentZutatenIndex);
            addEventListeners();
        })
        .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));
};

function displayZutaten(index) {
    const zutaten = zutatenData[index];
    if (zutaten) {
        document.getElementById('zutaten-name').textContent = zutaten.name;
        document.getElementById('zutaten-tags').textContent = zutaten.tags.join(', ');
        loadImage(zutaten.img);
    }
}

function loadImage(src) {
    const img = document.getElementById('zutaten-image');
    const placeholder = 'img/placeholder.jpg';

    // Zuerst versuchen wir, das Bild direkt zu laden
    img.src = src;

    img.onerror = function() {
        // Wenn das direkte Laden fehlschlägt, versuchen wir es mit einem Zeitstempel
        const timestamp = new Date().getTime();
        img.src = `${src}?t=${timestamp}`;
        
        img.onerror = function() {
            // Wenn auch das nicht klappt, laden wir das Platzhalterbild
            console.error(`Fehler beim Laden des Bildes: ${src}`);
            img.src = placeholder;
        };
    };
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
