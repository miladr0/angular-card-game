# angular-card-game
an angular card game using : angular jquery underscore bootstrap

a card game created with this conditions:

You are developing a very simple card game. There is a standard deck of 52 cards: 4 suits (clubs,
diamonds, hearts, spades)  x 13 card kinds (Ace, King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2). Each card kind

has a value assigned to it (see below):

Ace = 11 points

King = 4 points

Queen = 3 points

Jack = 2 points

10 = 10 points

9-2 = 0 points

The dealer first draws a wild card and then deals 5 cards to each player. Any card in a player’s hand that
matches the wild card suit will get its value multiplied by 2. I.e. if a wild card is 10 of spades and the
player has the Ace of spades, the value of the player's Ace is 22. The player with the highest amount of
points wins.

The game is to be developed as a web app with a simple text input that would accept a number of
players. Once the submit button is clicked, the application will randomly draw a wild card (displayed on
the screen) and then it will deal 5 random cards out of the remaining 51 in the deck for each player.
Each hand is also shown on the screen. Once all cards are dealt, the winner is shown on the screen.

# tip
game using browser localStorage for saving played games and can retrieve card values as well as winner.
# how to start:

    npm install

    npm start

# demo:
    http://house-of-cards.openode.io
