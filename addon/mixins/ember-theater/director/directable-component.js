import Ember from 'ember';

const {
  Mixin,
  get,
  isPresent,
  on,
  set
} = Ember;

const { computed: { alias } } = Ember;

export default Mixin.create({
  autoResolve: alias('directable.autoResolve'),
  autoResolveResult: alias('directable.autoResolveResult'),

  associateDirectable: on('didInitAttrs', function() {
    const directable = get(this, 'directable');

    set(directable, 'component', this);
  }),

  resolve(...args) {
    get(this, 'directable').resolve(...args);
  },

  resolveAndDestroy(...args) {
    const directable = get(this, 'directable');

    this.resolve(...args);
    directable.destroy();
  },

  destroyDirectable: on('willDestroyElement', function() {
    const directable = get(this, 'directable');

    if (isPresent(directable)) {
      directable.destroy();
    }
  })
});
