import Ember from 'ember';

export default Ember.Component.extend({
  whosTurn: 0,
  currentRound: 1,
  winner: 'Josh',
  players: [
    { name: 'Josh', score: 0 },
    { name: 'Derek', score: 0 },
    { name: 'Stephen', score: 0 },
    { name: 'Pat', score: 0 }
  ],
  actions: {
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

      if(round >= 2){
        let p1 = this.get('players').objectAt(0).score,
            p2 = this.get('players').objectAt(1).score,
            p3 = this.get('players').objectAt(2).score,
            p4 = this.get('players').objectAt(3).score,
            arr = [p1, p2, p3, p4],
            winnerNum = arr.indexOf( Math.max(...arr) ),
            winner = this.get('players').objectAt(winnerNum).name;

        this.set('winner', winner);
        alert("Game Over. "+this.get('winner')+" wins!");
      }

      this.set('whosTurn', nextTurn);
      console.log("Player "+nextTurn+"'s turn");
    },
    addPoint: function(){
      let player = this.get('players').objectAt(this.get('whosTurn'));
      let newScore = player.score + 1;
      Ember.set(player, 'score', newScore);
    }
  }
});
