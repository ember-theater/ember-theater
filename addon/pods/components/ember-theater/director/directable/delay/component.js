import Ember from 'ember';
import DirectableComponentMixin from 'ember-theater/mixins/ember-theater/director/directable-component';
import {
  EKMixin,
  keyUp
} from 'ember-keyboard';

const {
  Component,
  get,
  getProperties,
  isPresent,
  on,
  run
} = Ember;

export default Component.extend(DirectableComponentMixin, EKMixin, {
  handlePriorSceneRecord: on('didInitAttrs', function() {
    if (get(this, 'priorSceneRecord') === '_RESOLVED') {
      this.resolveAndDestroy(true);
    }
  }),

  setup: on('didInsertElement', function() {
    const attrs = get(this, 'directable.attrs');

    const {
      duration,
      keys,
      promise
    } = getProperties(attrs, 'duration', 'keys', 'promise');

    if (isPresent(keys)) {
      this._setupKeyPressWatcher(keys);
    }

    if (isPresent(duration)) {
      run.later(() => {
        this._resolve();
      }, duration);
    }

    if (isPresent(promise)) {
      promise.then(() => {
        this._resolve();
      });
    }
  }),

  _teardown: on('willDestroyElement', function() {
    this._resolve();
  }),

  _resolve() {
    this.resolveAndDestroy();
  },

  _setupKeyPressWatcher(keys) {
    keys.forEach((key) => {
      this.on(keyUp(key), this._resolve);
    });
  }
});
