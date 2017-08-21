import Ember from 'ember';

export default Ember.Component.extend({
  whosTurn: 0,
  players: [
    { name: 'Josh', score: 0 },
    { name: 'Derek', score: 0 },
    { name: 'Stephen', score: 0 },
    { name: 'Pat', score: 0 }
  ],
  actions: {
    addPlayer: function(){
      let playerName = this.get('playerName');
      this.get('players').pushObject({name: playerName, score: 0 });
    },
    nextTurn: function(){
      let turn = this.get('whosTurn');
      let numPlayers = this.get('players').length - 1;
      let nextTurn;

      if(turn < numPlayers){
        nextTurn = turn + 1;
      } else {
        nextTurn = 0;
      }
      this.set('whosTurn', nextTurn);
      console.log("Player "+nextTurn+"'s turn");
    }
  }
});
