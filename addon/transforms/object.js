import DS from 'ember-data';
import Ember from 'ember';

const { Transform } = DS;

export default Transform.extend({
  deserialize: function(serialized) {
    return Ember.Object.create(serialized);
  },

  serialize: function(deserialized) {
    return deserialized;
  }
});
