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
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number is NOT a 1
        if(dice !== 1){
            //Add the score
            roundScore += dice;
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
            document.querySelector('.dice').style.display = 'none';
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

    document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';//changing the CSS of the webpage

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