import Ember from 'ember';
import layout from './template';
import animate from 'ember-theater/utils/animate';
import configurable, { configurableClassNames } from 'ember-theater/macros/director/configurable';
import DirectableComponentMixin from 'ember-theater/mixins/ember-theater/director/directable-component';
import StyleableMixin from 'ember-theater/mixins/ember-theater/director/styleable';
import TransitionInMixin from 'ember-theater/mixins/ember-theater/director/transition-in';

const {
  Component,
  computed,
  get,
  inject,
  on
} = Ember;

const { alias } = computed;

export default Component.extend(DirectableComponentMixin, StyleableMixin, TransitionInMixin, {
  layout,

  classNames: ['et-text'],
  classNameBindings: ['configurableClassNames'],

  translator: inject.service('ember-theater/translator'),
  config: inject.service('ember-theater/config'),

  character: alias('directable.character'),
  instantWriteText: alias('directable.options.instant'),
  keys: configurable('text', 'keys.accept'),
  transitionIn: configurable('text', 'transitionIn.effect'),
  transitionInDuration: configurable('text', 'transitionIn.duration', 'transitionDuration'),
  transitionOut: configurable('text', 'transitionOut.effect'),
  transitionOutDuration: configurable('text', 'transitionOut.duration', 'transitionDuration'),
  configurableClassNames: configurableClassNames('text'),

  handleAutoResolve: on('didInitAttrs', function() {
    if (get(this, 'autoResolve')) {
      this.resolveAndDestroy();
    }
  }),

  displayName: computed('directable.options.displayName', {
    get() {
      const displayName = get(this, 'directable.options.displayName');

      return get(this, 'translator').translate(displayName);
    }
  }).readOnly(),

  name: computed('character.name', 'displayName', {
    get() {
      return get(this, 'displayName') ||
        get(this, 'translator').translate(get(this, 'character.name'));
    }
  }).readOnly(),

  text: computed('directable.text', {
    get() {
      const text = get(this, 'directable.text');

      return get(this, 'translator').translate(text);
    }
  }).readOnly(),

  textEffect: computed('directable.options.textEffect', 'character.textEffect', {
    get() {
      return get(this, 'directable.options.textEffect') ||
        get(this, 'character.textEffect') ||
        get(this, 'config').getProperty('text', 'textEffect');
    }
  }),

  textSpeed: computed('directable.options.textSpeed', 'character.textSpeed', {
    get() {
      return get(this, 'directable.options.textSpeed') ||
        get(this, 'character.textSpeed') ||
        get(this, 'config').getProperty('text', 'textSpeed');
    }
  }),

  actions: {
    completeText() {
      const effect = get(this, 'transitionOut');
      const duration = get(this, 'transitionOutDuration');

      animate(this.element, effect, { duration }).then(() => {
        this.resolveAndDestroy();
      });
    }
  }
});