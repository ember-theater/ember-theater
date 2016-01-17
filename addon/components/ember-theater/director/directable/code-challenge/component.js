import Ember from 'ember';
import layout from './template';
import DirectableComponentMixin from 'ember-theater/mixins/ember-theater/director/directable-component';
import configurable from 'ember-theater/macros/ember-theater/director/configurable';
import animate from 'ember-theater/utils/ember-theater/animate';

const {
  Component,
  computed,
  get,
  on,
  set
} = Ember;

const { inject: { service } } = Ember;

export default Component.extend(DirectableComponentMixin, {
  layout,

  config: service('ember-theater/config'),

  transitionOut: configurable('codeChallenge', 'transitionOut.effect'),
  transitionOutDuration: configurable('codeChallenge', 'transitionOut.duration', 'transitionDuration'),

  handleAutoResolve: on('didInitAttrs', function() {
    if (get(this, 'autoResolve')) {
      const choice = get(this, 'autoResolveResult');

      this.resolveAndDestroy(choice);
    }
  }),

  snippets: computed('directable.snippets', {
    get() {
      const snippets = get(this, 'directable.snippets');

      set(snippets.find((snippet) => get(snippet, 'readOnly') !== true), 'autofocus', true);

      snippets.forEach((snippet) => {
        if (get(snippet, 'readOnly')) {
          set(snippet, 'classNames', ['et-code-challenge-readOnly']);
        }
      });

      return snippets;
    }
  }),

  actions: {
    valueUpdated(snippet, index) {
      const snippets = get(this, 'snippets');

      set(snippets[index], 'code', get(snippet, 'code'));
    },

    complete() {
      let result;
      let isValid = true;

      try {
        const code = get(this, 'snippets').map((snippet) => get(snippet, 'code')).join(' ');
        const encapsulatedCode = `function userGeneratedCode() { ${code} }; userGeneratedCode();`;
        const transpiledCode = Babel.transform(encapsulatedCode, { presets: ['es2015'] }).code;

        result = eval(transpiledCode);
      } catch (exception) {
        set(this, 'exception', exception);
        isValid = false;
      }

      if (isValid) {
        const effect = get(this, 'transitionOut');
        const duration = get(this, 'transitionOutDuration');

        animate(this.element, effect, { duration }).then(() => {
          this.resolveAndDestroy(result);
        });
      }
    }
  }
});