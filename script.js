'use strict';

// SELECTING ELEMENTS
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

// FUNCTIONS
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

}
init()
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// DICE ROLLING FUNCTIONALITY
btnRoll.addEventListener('click', function () {
    if (playing) {
        // GENERATE RANDOM DICE ROLL
        const dice = Math.trunc(Math.random() * 6) + 1;

        // DISPLAY DICE
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // CHECK IF 1 IS ROLLED : IF SO, SWITCH PLAYER
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
            current0El.textContent = currentScore; //TODO : CHANGE TO CURRENT PLAYER
        } else {
            //switch to next player
            switchPlayer();
        }
    }
});

// SCORE HOLD FUNCTIONALITY
btnHold.addEventListener('click', function () {
    if (playing) {
        console.log();
        // add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // check score if player sore is >=100
        if (scores[activePlayer] >= 30) {
            // END THE GAME
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        }
        // switch to next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', init);