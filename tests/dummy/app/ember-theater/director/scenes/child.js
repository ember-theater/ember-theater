import { Scene } from 'ember-theater/ember-theater/director';

export default Scene.extend({
  name: 'Ember Theater Demo',

  start: async function(script, window) {
    await script.Text('Hello!');
    window.close();
  }
});
