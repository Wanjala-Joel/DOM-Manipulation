/*****************************************************************************
 CODING CHALLENGE
 */

 /* 1. A player  looses his entire score when he rolls two 6 in a row. After that it is the next player's turn. set to a var lastDice;*/
 /* 2. Add an iput field to the HTML where players can set the winning score, so that they can change predefined value of 100 */
 /* 3. Add another dice to the game, so that their are two dices now. The player looses his current score when one of them is a 1. */



var scores ,roundScore, activePlayer, gamePlaying;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //changing the inner HTML of a webpage


/************************************************************
 Events and Event handling
 */


document.querySelector('.btn-roll').addEventListener('click', function(){
     if(gamePlaying){
       //Steps
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        //3. Update the round score IF the rolled number is NOT a 1
        if(dice1 !== 1 && dice2 !== 1){
            //Add the score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            //Next player
        nextPlayer();
        }
     }

    
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if the player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            //Next Player
            nextPlayer();
        }
    }
    
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}