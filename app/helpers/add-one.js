import Ember from 'ember';

export function addOne(params) {
  let original = params[0],
      newValue = original + 1;
  return params;
}

export default Ember.Helper.helper(addOne);
