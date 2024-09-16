// Game constructor function to initialize game properties
function Game () {
  // Initialize game properties
  this.drawingPile = [] // Array to hold cards yet to be drawn
  this.playedCards = [] // Array to hold cards that have been played
  this.currentPlayer = 0 // Index of the current player
  this.isGameOver = false // Flag to indicate if the game is over
  this.noOfTurn = 0 // Number of consecutive turns a player has to take
  this.explosionStatus = false // Flag to indicate if an exploding kitten has been drawn
  this.knownCards = [] // Array to hold cards known to the players
  this.moves = [] // Array to track the moves made in the game
  this.player = [] // Array to hold player objects
}

// Method to start the game
Game.prototype.startGame = function () {
  // Initialize players and their cards
  this.player.push(new Player(), new Player())

  // Add cards to the drawing pile
  for (var i = 0; i < 4; i++) {
    this.drawingPile.push(new ShuffleCard())
    this.drawingPile.push(new SkipCard())
    this.drawingPile.push(new SeeTheFutureCard())
    this.drawingPile.push(new AttackCard())
    this.drawingPile.push(new DrawFromBottomCard())
    this.drawingPile.push(new FavorCard())

    // Add a defuse card on the last iteration
    if (i === 3) {
      this.drawingPile.push(new DefuseCard())
    }
  }

  // Shuffle the drawing pile
  game.shuffle()

  // Distribute cards to players
  for (var i = 0; i < this.player.length; i++) {
    for (var j = 0; j < 4; j++) {
      this.player[i].cards.push(this.drawingPile[j])
      this.drawingPile.shift()
    }
    // Give each player a defuse card
    this.player[i].cards.push(new DefuseCard())
  }

  // Add an exploding kitten card to the drawing pile
  this.drawingPile.push(new ExplodingKittenCard())

  // Shuffle the drawing pile again after adding the exploding kitten card
  game.shuffle()

  console.log(this) // Log the game state
  player1Timer() // Start the timer for player 1's turn
}

// Method to shuffle the drawing pile
Game.prototype.shuffle = function () {
  var i = this.drawingPile.length - 1
  while (i > 0) {
    num = Math.floor(Math.random() * this.drawingPile.length)
    var temp = this.drawingPile[i]
    this.drawingPile[i] = this.drawingPile[num]
    this.drawingPile[num] = temp
    i--
  }
}

// Method to check if the game is over
Game.prototype.checkGameOver = function () {
  if (this.player[game.currentPlayer].cards.length === 0 ) {
    this.isGameOver = true
  }
  return this.isGameOver
}

// Method to determine the winner of the game
Game.prototype.whoWon = function () {
  console.log('start'); // Log the start of the function
  return 1 - this.currentPlayer // Return the index of the winning player
}

// Method to switch to the next player's turn
Game.prototype.switchPlayer = function () {
  if (this.currentPlayer === 1) {
    this.currentPlayer = 0 // Switch to player 1's turn
    showYourTurn() // Show a message indicating it's the player's turn
  } else {
    this.currentPlayer = 1 // Switch to player 2's turn
  }
}

// Method to restart the game
Game.prototype.restart = function () {
  // Reset all game properties
  this.drawingPile = []
  this.playedCards = []
  this.currentPlayer = 0
  this.isGameOver = false
  this.noOfTurn = 0
  this.explosionStatus = false
  this.knownCards = []
  this.moves = []
  this.player = []

  console.log('before', game) // Log the game state before restart
  this.startGame() // Start the game again
  updateNotice() // Update the game notice
  updateDisplay() // Update the game display
  console.log(game) // Log the game state after restart
}

// Method to check the number of turns remaining for the current player
Game.prototype.checkTurns = function () {
  if (this.noOfTurn === 0) {
    this.switchPlayer() // If no turns remaining, switch to the next player's turn
  } else {
    this.noOfTurn -= 1 // Otherwise, decrement the number of turns remaining
  }
}

// Method to insert an exploding kitten card into the drawing pile at a specified index
Game.prototype.insertKitten = function (indec) {
  var temp = this.drawingPile[0]

  if (index >= 0 && index <= 2) {
    this.drawingPile.shift()
    this.drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    this.drawingPile.shift()
    this.drawingPile.push(temp)
  } else if (index === 4) {
    this.shuffle() // Shuffle the drawing pile if the index is 4
  }
  this.checkTurns() // Check the turns after inserting the kitten card
}

// Method to insert an exploding kitten card into the drawing pile at a specified index
Game.prototype.insertKitten = function (index) {
  var temp = this.drawingPile[0]

  if (index >= 0 && index <= 2) {
    this.drawingPile.shift()
    this.drawingPile.splice(index, 0, temp)
  } else if (index === 3) {
    this.drawingPile.shift()
    this.drawingPile.push(temp)
  } else if (index === 4) {
    this.shuffle() // Shuffle the drawing pile if the index is 4
  }
  this.checkTurns() // Check the turns after inserting the kitten card
}
