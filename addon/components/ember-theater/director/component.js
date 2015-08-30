import Ember from 'ember';
import layout from './template';

const {
  Component,
  computed,
  observer
} = Ember;

export default Component.extend({
  classNames: ['ember-theater-stage'],
  layout: layout,

  loadScene: observer('scene.id', function() {
    this.get('scene').script();
  })
});