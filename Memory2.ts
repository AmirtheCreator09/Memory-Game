const gameBoard = document.getElementById('game-board') as HTMLDivElement;

// Memory-Paare
const values = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].sort(() => Math.random() - 0.5);

let firstCard: HTMLDivElement | null = null;
let lockBoard = false;

// Karten erstellen
values.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value.toString();

    // Template-String für Karte
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">
                <img src="../Memory/bild${value}.png" class="card-image">
            </div>
        </div>
    `;

    // Klick-Event
    card.addEventListener('click', () => {
        // Wenn Board gesperrt oder gleiche Karte erneut angeklickt → abbrechen
        if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

        // Karte umdrehen
        card.classList.add('flipped');

        if (!firstCard) {
            // Erste Karte merken
            firstCard = card;
            return;
        }

        // Zweite Karte gewählt → Board sperren
        lockBoard = true;
        const secondCard = card;

        // Karten vergleichen
        if (firstCard.dataset.value === secondCard.dataset.value) {
            // Match gefunden → Karten offen lassen
            firstCard = null;
            lockBoard = false;
        } else {
            // Kein Match → nach 1 Sekunde zurückdrehen
            setTimeout(() => {
                firstCard!.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                lockBoard = false;
            }, 1000);
        }
    });


    gameBoard.appendChild(card);
});