import Ember from 'ember';

export default Ember.Controller.extend({
  gameStarted: false,
  gameEnded: false,
  name: '',
  description: '',
  image: '',
  numPlayers: 1,
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
      $.getJSON("/challenge-packs/bahpack1.json", function(data){
        let num = Math.floor(Math.random() * data['challenges'].length),
            challenge = data['challenges'][num];

        _this.set('name', challenge.name);
        _this.set('description', challenge.description);
        _this.set('image', challenge.image);
      });
    },
    setNumPlayers: function(num){
      this.set('numPlayers', num);
    },
    addPlayer: function(){
      let player1Name = this.get('player1Name'),
          player2Name = this.get('player2Name'),
          player3Name = this.get('player3Name'),
          player4Name = this.get('player4Name'),
          num = this.get('numPlayers');


      if( player1Name == '' || player1Name == null || player1Name == undefined){
        player1Name = 'Player 1';
      }
      if( player2Name == '' || player2Name == null || player2Name == undefined){
        player2Name = 'Player 2';
      }
      if( player3Name == '' || player3Name == null || player3Name == undefined){
        player3Name = 'Player 3';
      }
      if( player4Name == '' || player4Name == null || player4Name == undefined){
        player4Name = 'Player 4';
      }

      this.set('players', []);
      if( num >= 2 ){
        this.get('players').pushObject({name: player1Name, score: 0 });
        this.get('players').pushObject({name: player2Name, score: 0 });
      }
      if( num >= 3 ){
        this.get('players').pushObject({name: player3Name, score: 0 });
      }
      if( num == 4 ){
        this.get('players').pushObject({name: player4Name, score: 0 });
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

      if(nextRound >= 3 && turn == this.get('players').length - 1){
        /*let p1 = this.get('players').objectAt(0).score,
            p2 = this.get('players').objectAt(1).score,
            p3 = this.get('players').objectAt(2).score,
            p4 = this.get('players').objectAt(3).score;*/
        let arr = [];

        for( var i = 0; i < this.get('players').length; i++){
          arr.push( this.get('players').objectAt(i).score );
        }
        console.log(arr);
        let winnerNum = arr.indexOf( Math.max(...arr) ),
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
      this.send('addPlayer');
      this.set('gameStarted', true);
      console.log("start game");
    },
    newGame: function(){
      this.set('name', '');
      this.set('description', '');
      this.set('image', '');
      this.set('whosTurn', 0);
      this.set('numPlayers', 1);
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
