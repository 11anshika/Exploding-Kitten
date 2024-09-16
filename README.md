# Exploding-Kitten
https://11anshika.github.io/Exploding-Kitten/

**The-Exploding-Kitten**
##This application recreates the fun board game "Exploding Kitten", allowing players to play against a computer AI.

1.Getting Started 2.Clone the Repo 3.Open index.html 4.Have Fun

##Summary This game allows players to play against a virtual opponent. Each player takes turns playing their cards. Players can play as many cards as they wish but must end their turn by drawing a card from the drawing pile. The player who draws the exploding kitten will lose.

##Rules ##Step 1: Play a card from your hand and follow the instructions on the card, or play no cards at all.

##Step 2: After following the instructions on a card, you can continue playing more cards. You can play as many cards as you'd like.

##Step 3: Finally, end your turn by drawing a card from the Draw Pile into your hand and hoping it's not an Exploding Kitten.

##Card Types There are several magic cards that help players avoid drawing the exploding kitten:

1.Defuse - Defuse the bomb before it explodes. 2.See The Future - See the top three cards in the drawing pile. 3.Attack - Skip your turn and force the next player to take 2 turns. 4.Skip - Skip your turn. 5.Favor - Demand a card from the other player. 6.Shuffle - Shuffle the drawing pile. 7.Draw From Bottom - Draw from the bottom of the pile.

##Built With jQuery JavaScript CSS HTML

##Development ##The Approach An Object-Oriented Programming methodology was employed in the development. Each card in the pile is an object that inherits unique properties from its parent class. This allows for encapsulation of specific methods to objects, making the code cleaner and more readable.

###The Virtual Player The virtual player aims to simulate a real-life player's decision-making process in the game. A Probabilistic Decision Tree model was used, where each card is assigned a score based on different scenarios. The card with the highest score is then played. To introduce volatility, randomness was added to each score assigned.

##Author Anshika Singh ##Acknowledgments This application is built for programming practice purposes only. It is not an official "Exploding Kittens" application. If you love the game, please visit http://www.explodingkittens.com/ for more information.
