function Player () {
  // Constructor function for Player objects.
  this.cards = []  // Array to store the player's cards.
  this.moves = []  // Array to store the player's moves.
}

Player.prototype.playTurn = function (choice) {
  // Method for a player to play their turn.
  if (game.isGameOver === false) {
    // Check if the game is not over.
    if (game.explosionStatus === true) {
      // Check if an explosion has occurred.
      if (this.cards[choice].type !== 'defuse') {
        // If the chosen card is not a defuse card, return and do not proceed.
        return
      }
    }

    // Add the played card to the beginning of the playedCards array.
    game.playedCards.unshift(this.cards[choice])
    // Add the played card type to the beginning of the player's moves array.
    this.moves.unshift(this.cards[choice].type)
    // Create a temporary object to represent the player's move.
    var temp = {}
    temp[game.currentPlayer] = this.cards[choice].type
    // Add the temporary object to the beginning of the game's moves array.
    game.moves.unshift(temp)
    // Remove the played card from the player's cards array.
    this.cards.splice(choice, 1)
    // Render the played card on the game interface.
    game.playedCards[0].render()
  }

  // Log player and game information for debugging.
  console.log('player', game.player[0])
  console.log('game', game)
  // Update the game interface display.
  updateDisplay()
  // Update the game notice.
  updateNotice()
}

Player.prototype.drawCard = function (num) {
  // Method for a player to draw a card.
  console.log('Player', game.currentPlayer, 'drawCard')

  // Check if the drawn card is a kitten card.
  if (game.drawingPile[num].type === 'kitten') {
    // Render the kitten card.
    game.drawingPile[num].render()
    // Check if the game is over after drawing the kitten card.
    game.checkGameOver()
  } else {
    // If the drawn card is not a kitten card:
    // Add the drawn card to the player's cards array.
    this.cards.push(game.drawingPile[num])
    // Remove the drawn card from the drawing pile.
    game.drawingPile.splice(num, 1)

    // If the drawn card is from the top of the drawing pile, record the move as 'draw'.
    if (num === 0) {
      this.moves.unshift('draw')
      var temp = {}
      temp[game.currentPlayer] = 'draw'
      game.moves.unshift(temp)
    }
    // Check if it's time to switch players.
    game.checkTurns()
  }

  // If there are known cards and the drawn card is from the top of the drawing pile, remove the known card.
  if (game.knownCards.length > 0 && num === 0) {
    game.knownCards.shift()
  }

  // Update the game interface display.
  updateDisplay()
  // Update the game notice.
  updateNotice()
}
