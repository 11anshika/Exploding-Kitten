// Check if it is computer AI's turn every 5 seconds
var checkPlayer; // Variable to hold the interval reference for checking player turn

// Function to set a timer for the computer player's turn
function player1Timer() {
    clearInterval(checkPlayer); // Clear any existing timer
    checkPlayer = setInterval(function() {
        if (game.currentPlayer === 1 && !game.isGameOver) { // Check if it's computer player's turn and the game is not over
            computerPlayer(); // Call the computerPlayer function
        }
    }, 5000); // Set interval for checking every 5 seconds
}

// Function to handle the computer player's turn
function computerPlayer() {
    var currentCards = {}; // Object to store the count of each card type in the computer player's hand
    var max = ['', -Infinity]; // Initialize max to track the card with the highest priority

    // Iterate through the computer player's cards and initialize card counts
    for (var i = 0; i < game.player[1].cards.length; i++) {
        currentCards[game.player[1].cards[i].type] = 0;
    }
    currentCards['draw'] = 20; // Set a default value for the 'draw' card count

    // Use defuse card when explosion status is true
    if (game.explosionStatus === true) {
        if (Object.keys(currentCards).includes('defuse')) {
            game.player[1].playTurn(currentCards['defuse']); // Play defuse card
        } else {
            clearInterval(checkPlayer); // Clear the timer if no defuse card is available and the game is over
            clearInterval(countDown); // Clear the countdown timer for explosion
            game.isGameOver = true; // Set the game over flag
        }
        currentCards['draw'] = -20000; // Set a low priority for drawing cards when explosion status is true
    } else {
        // Adjust priority for defuse card based on randomness
        if (Object.keys(currentCards).includes('defuse')) {
            currentCards['defuse'] -= 500 * randomness();
        }

        // Adjust priorities for various cards based on game state and previous moves
        // Example: currentCards['skip'] = 100; // Increase priority for 'skip' card

        // Loop through the computer player's cards to find the most favorable move
        for (var key in currentCards) {
            if (currentCards[key] > max[1]) {
                max[0] = key;
                max[1] = currentCards[key];
            }
        }

        // Execute the most favorable move found
        if (max[0] === 'draw') {
            player1Draw(); // Draw a card
        } else {
            for (var i = 0; i < game.player[1].cards.length; i++) {
                if (game.player[1].cards[i].type === max[0]) {
                    game.player[1].playTurn(i); // Play the selected card
                    break;
                }
            }
        }
    }
}

// Function to introduce randomness in probability calculations
function randomness() {
    var randomValue = Math.random();
    if (randomValue < 0.5) {
        randomValue += 0.5;
    }
    return randomValue;
}

// Function to handle player 1's draw action (for simulation)
function player1Draw() {
    // Simulate player 1 drawing a card
    console.log("Player 1 drew a card.");
}