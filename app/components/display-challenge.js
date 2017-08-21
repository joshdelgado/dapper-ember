import Ember from 'ember';

export default Ember.Component.extend({
  name: 'nameee',
  description: 'descriptionnnn',
  image: 'imageeeee',
  actions: {
    newChallenge: function(){
      var thiss = this;
      $.getJSON("/challenge-packs/bahpack1.json", function(data){
        var num = Math.floor(Math.random() * data['challenges'].length)
        var challenge = data['challenges'][num];

        thiss.set('name', challenge.name);
        thiss.set('description', challenge.description);
        thiss.set('image', challenge.image);
      });
    }
  }
});
