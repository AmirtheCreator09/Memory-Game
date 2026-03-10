var gameBoard = document.getElementById('game-board');
// Memory-Paare
var values = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].sort(function () { return Math.random() - 0.5; });
var firstCard = null;
var lockBoard = false;
// Karten erstellen
values.forEach(function (value) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value.toString();
    // Template-String für Karte
    card.innerHTML = "\n        <div class=\"card-inner\">\n            <div class=\"card-front\">?</div>\n            <div class=\"card-back\">\n                <img src=\"../Memory/bild".concat(value, ".png\" class=\"card-image\">\n            </div>\n        </div>\n    ");
    // Klick-Event
    card.addEventListener('click', function () {
        // Wenn Board gesperrt oder gleiche Karte erneut angeklickt → abbrechen
        if (lockBoard || card === firstCard || card.classList.contains('flipped'))
            return;
        // Karte umdrehen
        card.classList.add('flipped');
        if (!firstCard) {
            // Erste Karte merken
            firstCard = card;
            return;
        }
        // Zweite Karte gewählt → Board sperren
        lockBoard = true;
        var secondCard = card;
        // Karten vergleichen
        if (firstCard.dataset.value === secondCard.dataset.value) {
            // Match gefunden → Karten offen lassen
            firstCard = null;
            lockBoard = false;
        }
        else {
            // Kein Match → nach 1 Sekunde zurückdrehen
            setTimeout(function () {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                lockBoard = false;
            }, 1000);
        }
    });
    gameBoard.appendChild(card);
});
