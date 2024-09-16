var game = new Game()
// Creates a new instance of the Game object.

// Main Event Listener
$(document).ready(function () {
  // Executes the following code when the document is fully loaded.

// ---------------Game Page------------------------

  // Player 1 Cards click
  $('.player0Cards').off('click', 'div')
  // Removes any existing click event handlers for player 1 cards.
  $('.player0Cards').on('click', 'div', function () {
    // Attaches a click event handler to each div within player 1's cards.
    $('.seeTheFutureBoard').hide()
    // Hides the "See the Future" board.
    var index = $('.player0Cards div').index(this)
    // Gets the index of the clicked card within player 1's cards.
    var positiony = $(this).position().top
    // Gets the vertical position of the clicked card.
    var positionx = $(this).position().left
    // Gets the horizontal position of the clicked card.
    var desy = ($('.dechargePile').position().top + 200) / 10
    // Calculates the vertical distance to the discard pile.
    var desx = ($('.dechargePile').position().left + parseInt($('.dechargePile').css('height')) - $('.player0Cards').position().left - positionx) / 10
    // Calculates the horizontal distance to the discard pile.

    if (game.currentPlayer === 0 && game.isGameOver === false) {
      // Checks if it's player 1's turn and the game is not over.
      clearInterval(moveInterval)
      // Clears any existing interval for card movement.
      var moveInterval = setInterval(function () {
        // Sets up an interval for card movement animation.
        if (desx <= 35 || desx <= -35) {
          positiony -= desy
        } else {
          positiony -= desy
          positionx += desx
        }
        // Updates the card's position based on the calculated distances.

        $(this).css({
          height: 240,
          width: 180,
          top: positiony,
          left: positionx
        })
        // Applies CSS styles to animate the card's movement.

        if (positiony <= -desy * 10) {
          clearInterval(moveInterval)
          // Stops the interval when the card reaches the discard pile.
          if (game.currentPlayer === 0) {
            game.player[game.currentPlayer].playTurn(index)
          }
          // Plays the selected card if it's player 1's turn.
        }
      }.bind(this), 1000 / 30)
      // Sets the animation interval to update every 30th of a second.
    } else {
      alert('It is not your turn!')
      // Shows an alert if it's not player 1's turn.
    }
  })

  // DrawingPile click
  $('.container').off('click', '.drawingPile')
  // Removes any existing click event handlers for the drawing pile.
  $('.container').on('click', '.drawingPile', function () {
    // Attaches a click event handler to the drawing pile.
    $('.seeTheFutureBoard').hide()
    // Hides the "See the Future" board.
    if (game.currentPlayer === 0) {
      // Checks if it's player 1's turn.
      var positiony = $('.drawingPile:last-child').position().top
      // Gets the vertical position of the last card in the drawing pile.
      var positionx = $('.drawingPile:last-child').position().left
      // Gets the horizontal position of the last card in the drawing pile.
      clearInterval(moveInterval)
      // Clears any existing interval for card movement.
      var moveInterval = setInterval(function () {
        // Sets up an interval for card movement animation.
        positiony += 20
        positionx += 20
        // Updates the positions for animation.
        $('.drawingPile:last-child').css({
          top: positiony,
          left: positionx
        })
        // Applies CSS styles to animate the card's movement.

        if (positiony >= parseInt($('body').css('height')) - 100) {
          // Checks if the card has reached a certain vertical position.
          $('.drawingPile:last-child').remove()
          // Removes the last card from the drawing pile.
          if (game.currentPlayer === 0) {
            game.player[game.currentPlayer].drawCard(0)
          }
          // Draws a card for player 1.
          clearInterval(moveInterval)
          // Stops the interval.
        }
      }, 1000 / 30)
      // Sets the animation interval to update every 30th of a second.
    }
  })

  // select
  $('.select button').click(function () {
    // Attaches a click event handler to the select button.
    var index = $(this).index()
    // Gets the index of the clicked button.
    console.log('index', index)
    // Logs the index of the clicked button.
    game.insertKitten((index - 1))
    // Inserts a kitten based on the selected index.
    $('.select').hide()
    // Hides the selection interface.
  })

// -------------Game Page End----------------------

// -------------Game Over Page---------------------

  // Restart
  $('#restart').click(function () {
    // Attaches a click event handler to the restart button.
    $('.gameOver').hide()
    // Hides the game over screen.
    $('.explosive').hide()
    // Hides the explosive indicator.
    $('.dechargePile').removeAttr('id')
    // Removes the ID attribute from the discard pile.
    $('#avatar0').removeAttr('style')
    // Removes the inline style attribute from avatar0.
    $('#avatar1').removeAttr('style')
    // Removes the inline style attribute from avatar1.
    clearInterval(countDown)
    // Clears any existing countdown interval.
    game.restart()
    // Restarts the game.
  })

// -------------Game Over End----------------------

// -----------------Main Page----------------------

  // cardsProperties
  $('.cards div').hover(function () {
    // Attaches hover event handlers to each div within the cards.
    var type = $(this).attr('id')
    // Gets the ID of the hovered card.
    $('.cards p').text(cardsProperties[type])
    // Displays the properties of the hovered card.
  },
  function () {
    $('.cards p').text('')
    // Clears the card properties text when the hover ends.
  }
)

  // startGame Button
  $('.play button').click(function () {
    // Attaches a click event handler to the start game button.
    $('.main').hide()
    // Hides the main page.
    $('.game').fadeIn()
    // Shows the game page.
    game.startGame()
    // Starts the game.
    updateNotice()
    // Updates the game notice.
    updateCards()
    // Updates the player cards.
  })

// ---------------Main Page End---------------------
})

// ----------Helping Function-------------------

// Update Game Interface
function updateDisplay () {
  // Defines a function to update the game interface.
  if (game.isGameOver === true) {
    // Checks if the game is over.
    $('.player1Explosive').remove()
    // Removes the player 1 explosive indicator.
    $('.gameOver').fadeIn()
    // Shows the game over screen.
    console.log('winner',game.whoWon());
    // Logs the winner of the game.
    $('#avatar' + game.whoWon()).css({
      'border': '5px solid yellow '
    })
    // Adds a yellow border to the winning player's avatar.
  }

  if (game.playedCards.length > 0) {
    // Checks if there are played cards.
    $('.dechargePile').attr('id', game.playedCards[0].type)
    // Sets the ID of the discard pile based on the played card type.
  }

  $('.drawingPile').remove()
  // Removes all elements with the class 'drawingPile'.
  $('.player0Cards div').remove()
  // Removes all div elements within player 0's cards.
  $('.player1Cards').remove()
  // Removes all elements with the class 'player1Cards'.
  updateCards()
  // Updates the player cards.
}

// Show Explosive
var flashKitten
// Declares a variable for the explosive flash animation.
function showExplosive () {
  // Defines a function to show the explosive indicator.
  if (game.currentPlayer === 0) {
    // Checks if it's player 1's turn.
    $('.explosive').fadeIn()
    // Shows the explosive indicator for player 1.
  } else {
    // If it's not player 1's turn:
    $('body').append('<div class="player1Explosive"></div>')
    // Appends an explosive indicator for player 2.
    var flashTime = 10
    // Sets the initial flash time.
    clearInterval(flashKitten)
    // Clears any existing explosive flash interval.
    flashKitten = setInterval(function () {
      // Sets up an interval for the explosive flash animation.
      flashTime -= 0.1
      // Decrements the flash time.
      $('.player1Explosive').fadeIn().fadeOut()
      // Shows and hides the explosive indicator for player 2.

      if (flashTime < 0) {
        // Checks if the flash time has elapsed.
        clearInterval(flashKitten)
        // Stops the flash animation interval.
        $('.player1Explosive').remove()
        // Removes the explosive indicator for player 2.
      }
    }, 500)
    // Sets the flash animation interval to update every 0.5 seconds.
  }
}

// Hide Explosive
function hideExplosive () {
  // Defines a function to hide the explosive indicator.
  clearInterval(flashKitten)
  // Clears any existing explosive flash interval.
  if (game.currentPlayer === 0) {
    // Checks if it's player 1's turn.
    $('.explosive').hide()
    // Hides the explosive indicator for player 1.
  } else {
    // If it's not player 1's turn:
    $('.player1Explosive').remove()
    // Removes the explosive indicator for player 2.
  }
}

function updateNotice () {
  // Defines a function to update the game notice.
  $('.notice h1').remove()
  $('.notice h2').remove()

  if (game.moves.length > 0) {
    // Checks if there are any moves recorded.
    if (Object.values(game.moves[0])[0] === 'draw') {
      // Checks if the first move is a draw action.
      $('.notice h3').text(' draw a card ')
      // Displays a message indicating a card draw.
      .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
      // Prepends the player avatar to the message.
    } else if (Object.values(game.moves[0])[0] === 'favor') {
      // Checks if the first move is a favor action.
      $('.notice h3').text(' got ')
      // Displays a message indicating a favor action.
      .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
      // Prepends the player avatar to the message.
      .append('<div  class="small-card" id="' + game.player[Object.keys(game.moves[0])[0]].cards[game.player[Object.keys(game.moves[0])[0]].cards.length - 1].type + '"></div> from')
      // Appends the drawn card's type to the message.
      .append('<div class="avatar' + (1 - Object.keys(game.moves[0])[0]) + '"></div>')
      // Appends the opponent's avatar to the message.
    } else {
      // If the move is neither draw nor favor:
      $('.notice h3').text(' played ')
      // Displays a message indicating a played card.
    .prepend('<div class="avatar' + Object.keys(game.moves[0])[0] + '"></div>')
      // Prepends the player avatar to the message.
    .append('<div  class="small-card" id="' + Object.values(game.moves[0])[0] + '"></div>')
      // Appends the played card's type to the message.
    }
  }

  var timeout = setTimeout(function () {
    // Sets a timeout to clear the notice message.
    $('.notice h1').remove()
    $('.notice h2').remove()
    $('.notice h3').text('')
    // Clears the notice message.
    $('.notice h3 div').remove()
    // Removes any additional elements within the notice message.
    $('.notice').append('<h1>')
    // Appends a new h1 element to the notice.
    $('.notice h1').text('\'s Turn')
    // Displays a message indicating whose turn it is.
    .prepend('<div class="avatar' + game.currentPlayer + '"></div>')
    // Prepends the current player's avatar to the message.
    if (game.noOfTurn !== 0) {
      // Checks if there are any extra turns.
      $('.notice').append('<h2> x' + (game.noOfTurn + 1) + ' draw</h2>')
      // Displays the number of extra draw turns.
    }
  }, 3000)
  // Sets the timeout duration to 3 seconds.

  $('.explosive-meter h1').text(Math.round(1 / game.drawingPile.length * 100) + ' %')
  // Calculates and displays the percentage of remaining cards in the drawing pile.
}

function updateCards () {
  // Defines a function to update the player cards.
  var align = 0
  for (var i = 0; i < game.drawingPile.length; i++) {
    // Iterates over the drawing pile.
    $('.relative').append('<div class="drawingPile">')
    // Appends a new div for each card in the drawing pile.
    $('.drawingPile:nth-child(' + (i + 1) + ')').css({
      'right': align + 'px'
    })
    // Sets the position of each card in the drawing pile.
    align += 2
    // Increments the alignment for the next card.
  }

  $('.player0Cards').css({
    'width': (50 * (game.player[0].cards.length - 2) + 200) + 'px'
  })
  // Sets the width of player 0's cards based on the number of cards.

  var left = 0
  for (var i = 0; i < game.player[0].cards.length; i++) {
    // Iterates over player 0's cards.
    $('.player0Cards').append('<div></div>')
    // Appends a new div for each card.
    $('.player0Cards div:nth-child(' + (i + 1) + ')').css({
      'left': left + 'px'
    })
  .attr('id', game.player[0].cards[i].type)
    // Sets the position and ID of each card.
    left += 50
    // Increments the left position for the next card.
  }

  for (var i = 0; i < game.player[1].cards.length; i++) {
    // Iterates over player 1's cards.
    $('.player1').prepend('<div class="player1Cards"></div>')
    // Prepends a new div for each card.
  }

  // Player 1 hover
  $('.player0Cards div').hover(function () {
    // Attaches hover event handlers to player 0's cards.
    var index = $('.player0Cards div').index(this) + 1
    // Gets the index of the hovered card.
    var height = $('.player0Cards div:nth-child(' + index + ')').css('height')
    // Gets the height of the hovered card.
    $('.player0Cards div:nth-child(' + index + ')').css({
      'height': parseInt(height) + 50 + 'px'
    })
    // Increases the height of the hovered card.
  },
  function () {
    var index = $('.player0Cards div').index(this) + 1
    // Gets the index of the hovered card.
    var height = $('.player0Cards div:nth-child(' + index + ')').css('height')
    // Gets the height of the hovered card.
    $('.player0Cards div:nth-child(' + index + ')').css({
      'height': (parseInt(height) - 50) + 'px',
      'bottom': 0
    })
    // Decreases the height of the hovered card and resets its position.
  })
}

function updateTime () {
  // Defines a function to update the game time.
  $('#time').text(Math.ceil(time))
  // Displays the rounded-up game time.
}

function showTopCards () {
  // Defines a function to show the top cards in the drawing pile.
  console.log('Showing Top Cards')
  // Logs a message indicating the action.
  var length = 3
  // Sets the number of top cards to display.
  if (game.drawingPile.length < length) {
    length = game.drawingPile.length
    // Adjusts the number of top cards if there are fewer cards remaining.
  }

  $('.seeTheFutureBoard div').removeAttr('id')
  // Removes any existing IDs from the "See the Future" board.
  for (var i = 0; i < length; i++) {
    // Iterates over the specified number of top cards.
    $('.seeTheFutureBoard div:nth-child(' + (i + 2) + ')').attr('id', game.drawingPile[i].type)
    // Sets the ID of each card in the "See the Future" board.
  }

  $('.seeTheFutureBoard').fadeIn()
  // Displays the "See the Future" board.
  $('.seeTheFutureBoard').delay(2000).fadeOut()
  // Sets a delay before hiding the "See the Future" board.
}

function showYourTurn () {
  // Defines a function to indicate the player's turn.
  $('.yourTurn').delay(300).fadeIn()
  // Displays a "Your Turn" message with a delay.
  $('.yourTurn').delay(500).fadeOut()
  // Hides the "Your Turn" message after a delay.
}

function showSelect () {
  // Defines a function to show the selection interface.
  $('.select').fadeIn()
  // Displays the selection interface.
}

function playAudio (index) {
  // Defines a function to play audio.
  $('audio')[index].play()
  // Plays the audio at the specified index.
}

function player1Draw () {
  // Defines a function for player 1 to draw a card.
  var positiony = $('.drawingPile:last-child').position().top
  // Gets the vertical position of the last card in the drawing pile.
  var positionx = $('.drawingPile:last-child').position().left
  // Gets the horizontal position of the last card in the drawing pile.
  clearInterval(moveInterval)
  // Clears any existing interval for card movement.
  var moveInterval = setInterval(function () {
    // Sets up an interval for card movement animation.
    positiony -= 20
    positionx += 20
    // Updates the positions for animation.
    $('.drawingPile:last-child').css({
      top: positiony,
      left: positionx
    })
    // Applies CSS styles to animate the card's movement.

    if (positiony <= parseInt($('body').position().top) - 100) {
      // Checks if the card has reached a certain vertical position.
      $('.drawingPile:last-child').remove()
      // Removes the last card from the drawing pile.
      clearInterval(moveInterval)
      // Stops the interval.
      game.player[game.currentPlayer].drawCard(0)
      // Draws a card for player 1.
    }
  }, 1000 / 30)
  // Sets the animation interval to update every 30th of a second.
}