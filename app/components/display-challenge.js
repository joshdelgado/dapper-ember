import Ember from 'ember';

export default Ember.Component.extend({
  name: 'nameee',
  description: 'descriptionnnn',
  image: 'imageeeee',
  actions: {
    newChallenge: function(){
      var _this = this;
      $.getJSON("/challenge-packs/bahpack1.json", function(data){
        var num = Math.floor(Math.random() * data['challenges'].length)
        var challenge = data['challenges'][num];

        _this.set('name', challenge.name);
        _this.set('description', challenge.description);
        _this.set('image', challenge.image);

        
      });
    }
  }
});
