import Ember from 'ember';

export default Ember.Controller.extend({
  gameStarted: false,
  gameStarted: false,
  name: '',
  description: '',
  image: '',
  whosTurn: 0,
  currentRound: 1,
  winner: '',
  players: [
    { name: 'Josh', score: 0 },
    { name: 'Derek', score: 0 },
    { name: 'Stephen', score: 0 },
    { name: 'Pat', score: 0 }
  ],
  actions: {
    newChallenge: function(){
      let _this = this;
      $.getJSON("/challenge-packs/hellohollywood.json", function(data){
        let num = Math.floor(Math.random() * data['challenges'].length),
            challenge = data['challenges'][num];

        _this.set('name', challenge.name);
        _this.set('description', challenge.description);
        _this.set('image', challenge.image);
      });
    },
    addPlayer: function(){
      if(this.get('players').length == 3){
        let playerName = this.get('playerName');
        this.get('players').pushObject({name: playerName, score: 0 });
      } else {
        alert("Demo needs 4 players");
      }
    },
    nextTurn: function(){
      let turn = this.get('whosTurn'),
          numPlayers = this.get('players').length - 1,
          nextTurn = turn + 1,
          round = this.get('currentRound'),
          nextRound = round + 1,
          winnerNum = 0;

      if(turn >= numPlayers){
        nextTurn = 0;
        this.set('currentRound', nextRound);
        console.log("Round "+round+" Complete");
      }

      //console.log(turn);

      if(nextRound >= 2 && turn == 3){
        let p1 = this.get('players').objectAt(0).score,
            p2 = this.get('players').objectAt(1).score,
            p3 = this.get('players').objectAt(2).score,
            p4 = this.get('players').objectAt(3).score,
            arr = [p1, p2, p3, p4],
            winnerNum = arr.indexOf( Math.max(...arr) ),
            winner = this.get('players').objectAt(winnerNum).name;

        this.set('winner', winner);
        this.send('gameOver');
        //alert("Game Over. "+this.get('winner')+" wins!");
      }

      this.set('whosTurn', nextTurn);
      console.log("Player "+nextTurn+"'s turn");
      this.send('newChallenge');
    },
    firstRound: function(){
      this.send('newChallenge');
      this.set('gameStarted', true);
      console.log("start game");
    },
    newGame: function(){
      this.set('name', '');
      this.set('description', '');
      this.set('image', '');
      this.set('whosTurn', 0);
      this.set('currentRound', 1);
      this.set('gameStarted', false);
      this.set('gameEnded', false);
      for(var i = 0; i < this.get('players').length; i++){
        Ember.set(this.get('players').objectAt(i), 'score', 0);
      }
      console.log('new game');
    },
    gameOver: function(){
      this.set('gameEnded', true);
      console.log("end game");
    },
    addPoint: function(){
      let player = this.get('players').objectAt(this.get('whosTurn'));
      let newScore = player.score + 1;
      Ember.set(player, 'score', newScore);
      this.send('nextTurn');
    }
  }
});
