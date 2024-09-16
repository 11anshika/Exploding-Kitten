// Cards and Cards' Methods

// Cards properties
var cardsProperties = {
  'kitten': 'Unless you have a DEFUSE CARD, you\'re dead.',
  'attack': 'End your turn(s) without drawing and force the next player to take 2 turns in a row. (If the victim of an ATTACK CARD plays an ATTACK CARD, their turns are immediately over, and the next player must take 2 turns.)',
  'skip': 'Immediately end your turn without drawing a card. If you play a SKIP CARD as a defense against an ATTACK CARD, it only ends one of the two turns. Two SKIP CARDS would end both turns.',
  'favor': 'Force any other player to give you 1 card from their hand. The cards is randomly assigned.',
  'shuffle': 'Shuffle the Draw Pile without viewing the cards until told to stop. (Useful when you know there\'s an EXPLODING KITTEN coming.)',
  'see-the-future': 'Peek at the top 3 cards from the Draw Pile.',
  'draw-from-bottom': 'Draw a card from the bottom of Draw Pile.',
  'defuse': 'Save yourself from exploding.'
}

// Constructor function for Shuffle Card
function ShuffleCard () {
  this.type = 'shuffle'
}

// Constructor function for Exploding Kitten Card
function ExplodingKittenCard () {
  this.type = 'kitten'
}

// Constructor function for Defuse Card
function DefuseCard () {
  this.type = 'defuse'
}

// Constructor function for Skip Card
function SkipCard () {
  this.type = 'skip'
}

// Constructor function for Attack Card
function AttackCard () {
  this.type = 'attack'
}

// Constructor function for See The Future Card
function SeeTheFutureCard () {
  this.type = 'see-the-future'
}

// Constructor function for Draw From Bottom Card
function DrawFromBottomCard () {
  this.type = 'draw-from-bottom'
}

// Constructor function for Favor Card
function FavorCard () {
  this.type = 'favor'
}

// Render method for Shuffle Card
ShuffleCard.prototype.render = function () {
  game.shuffle()
}

// Render method for See The Future Card
SeeTheFutureCard.prototype.render = function () {
  console.log('SeeTheFuture Started')

  if (game.currentPlayer === 0) {
    showTopCards()
  } else {
    game.knownCards = game.drawingPile.slice(0, 3)
  }
}

// Render method for Skip Card
SkipCard.prototype.render = function () {
  console.log('Skip Cards Started')
  game.checkTurns()
  console.log('Skip Cards Ended, current player is', game.currentPlayer)
}

// Render method for Defuse Card
DefuseCard.prototype.render = function () {
  console.log('Defuse Cards Started')

  clearInterval(countDown)
  game.explosionStatus = false
  hideExplosive()

  if (game.drawingPile[0].type === 'kitten') {
    if (game.currentPlayer === 0) {
      showSelect()
    } else {
      game.shuffle()
      game.checkTurns()
    }
  }
  console.log('Defuse Cards Ended')
}

// Render method for Attack Card
AttackCard.prototype.render = function () {
  console.log('Attack Cards Started')
  game.switchPlayer()
  if (game.noOfTurn === 0) {
    game.noOfTurn += 1
  } else {
    game.noOfTurn += 2
  }
  console.log('Attack Cards Ended, current player is', game.currentPlayer)
}

// Exploding Kitten Card related variables
var countDown
var time
// Render method for Exploding Kitten Card
ExplodingKittenCard.prototype.render = function () {
  console.log('Exploding Started')

  game.explosionStatus = true
  playAudio(0)
  showExplosive()

  time = 10
  clearInterval(countDown)
  countDown = setInterval(function () {
    time -= 0.1
    updateTime()
    console.log(time);
    if (time < 0) {
      game.isGameOver = true
      playAudio(1)
      game.whoWon()
      clearInterval(flashKitten)
      hideExplosive()
       clearInterval(countDown)
      updateDisplay()
    }
  }, 100)

  console.log('Explosing Ended')
}

// Render method for Draw From Bottom Card
DrawFromBottomCard.prototype.render = function () {
  console.log('draw', this)
  console.log('Draw From Bottom Started')
  game.player[game.currentPlayer].drawCard(game.drawingPile.length - 1)
  console.log('Draw From Bottom  Ended')
}

// Render method for Favor Card
FavorCard.prototype.render = function () {
  console.log('Favor Cards Started')
  var num = Math.floor((Math.random()) * game.player[1 - game.currentPlayer].cards.length)

  game.player[game.currentPlayer].cards.push(game.player[1 - game.currentPlayer].cards[num])
  game.player[1 - game.currentPlayer].cards.splice(num, 1)
  console.log('Ended Started')
}