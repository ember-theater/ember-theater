import Ember from 'ember';
import { TextTag } from 'ember-theater/ember-theater/director';

const {
  get,
  set
} = Ember;

export default TextTag.extend({
  /**
    Changes the textSpeed. If the provided speed starts with a '*', it'll multiply the speed by the
    following number. Note that lower numbers are faster, so multiply by a fraction (eg, `0.5`) to
    make the text go faster.

    @method start
    @param {Object} context
    @param {Number} index
    @param {String} speed
  */

  start(context, index, speedString) {
    const radix = 10;
    const speed = speedString.charAt(0) === '*' ?
      parseInt(get(context, 'textSpeed'), radix) * parseFloat(speedString.substring(1), radix) :
      speedString;

    set(context, 'textSpeed', speed);
    context.writeWord(index + 1);

    this.destroy();
  }
});
