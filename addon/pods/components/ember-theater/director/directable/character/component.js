import Ember from 'ember';
import layout from './template';
import DirectableComponentMixin from 'ember-theater/mixins/ember-theater/director/directable-component';
import VelocityLineMixin from 'ember-theater/mixins/ember-theater/director/velocity-line';
import WindowResizeMixin from 'ember-theater/mixins/ember-theater/window-resize';
import configurable from 'ember-theater/macros/ember-theater/configurable';
import multitonService from 'ember-theater/macros/ember-theater/multiton-service';
import { Directable } from 'ember-theater/ember-theater/director';

const {
  Component,
  K,
  computed,
  get,
  isBlank,
  on,
  set
} = Ember;

const { alias } = computed;
const { run: { later } } = Ember;
const { Handlebars: { SafeString } } = Ember;

const configurablePriority = [
  'directable.options',
  'character.character',
  'character',
  'config.attrs.director.character',
  'config.attrs.globals'
];

export default Component.extend(DirectableComponentMixin, VelocityLineMixin, WindowResizeMixin, {
  attributeBindings: ['style'],
  classNames: ['et-character'],
  layout: layout,

  config: multitonService('ember-theater/config', 'theaterId'),

  expressionContainers: computed(() => Ember.A([])),

  character: alias('directable.character'),
  height: configurable(configurablePriority, 'height'),

  changeExpression(resolve, expression, { transitionIn = {}, transitionOut = {} }) {
    this._transitionOutExpressions(transitionOut);
    this._transitionInExpression(resolve, expression, transitionIn);
  },

  style: computed('height', {
    get() {
      const height = get(this, 'height');

      return new SafeString(`height: ${height}%;`);
    }
  }).readOnly(),

  // during a window resize, the img dimensions get out of proportion. by forcing the browser
  // to redraw the element, we force it to also recalculate the ratios.
  handleWindowResize: on('windowResize', function() {
    this.$().css('display', 'none');

    later(() => {
      this.$().css('display', 'block');
    }, 50);
  }),

  addInitialExpression: on('didInsertElement', function() {
    const expression = get(this, 'directable.initialExpression');

    const expressionContainer = Ember.Object.create({
      expression,
      directable: Directable.create({
        effect: { opacity: 1 },
        options: { duration: 0 },
        resolve: K
      })
    });

    this.get('expressionContainers').pushObject(expressionContainer);
  }),

  _transitionOutExpressions(transition) {
    const expression = get(this, 'expressionContainers.firstObject');

    if (isBlank(get(transition, 'effect'))) {
      set(transition, 'effect', 'transition.fadeOut');
    }

    set(transition, 'resolve', () => {
      get(this, 'expressionContainers').removeObjects(expression);
    });

    set(expression, 'directable', Directable.create(transition));
  },

  _transitionInExpression(resolve, expression, transition) {
    if (isBlank(get(transition, 'effect'))) {
      set(transition, 'effect', 'transition.fadeIn');
    }

    set(transition, 'resolve', resolve);

    const expressionContainer = Ember.Object.create({
      expression,
      directable: Directable.create(transition)
    });

    get(this, 'expressionContainers').unshiftObject(expressionContainer);
  }
});