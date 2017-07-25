import Ember from 'ember';

export default Ember.Component.extend({
  players: ['Josh', 'Derek', 'Stephen', 'Pat'],
  actions: {
    addPlayer: function(){
      let playerName = this.get('playerName');
      this.get('players').pushObject(playerName);
    }
  }
});
