// Funktion zur Navigation zwischen Seiten
function goto(page, meal) {
    window.location.href = `${page}?meal=${meal}`;
}

// Funktion zum Auslesen der URL-Parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Den Parameter "meal" auslesen
    const meal = getQueryParam('meal');

// Wenn ein "meal" Parameter gefunden wurde, wird der Titel geändert
    if (meal) {
        document.getElementById('page-title').innerText = meal;
        document.getElementById('heading-title').innerText = meal;
}
