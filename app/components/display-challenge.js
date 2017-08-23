import Ember from 'ember';

export default Ember.Component.extend({
  name: '',
  description: '',
  image: '',
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
    }
  }
});
