import Ember from 'ember';

export default Ember.Component.extend({
  players: [
    { name: 'Josh', score: 0 },
    { name: 'Derek', score: 0 },
    { name: 'Stephen', score: 0 },
    { name: 'Pat', score: 0 }
  ],
  actions: {
    addPlayer: function(){
      let playerName = this.get('playerName');
      this.get('players').pushObject(playerName);
    }
  }
});
