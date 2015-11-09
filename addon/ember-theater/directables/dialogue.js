import Ember from 'ember';
import { Directable } from 'ember-theater';

const {
  get,
  isPresent,
  setProperties,
  typeOf
} = Ember;

export default Directable.extend({
  componentType: 'ember-theater/director/dialogue',
  layer: 'theater.text.dialogue',

  parseArgs(characterOrText, textOrOptions = {}, optionsOnly = {}) {
    const characterIsPresent = typeOf(textOrOptions) === 'string' ||
      isPresent(get(textOrOptions, 'id')) ||
      isPresent(get(textOrOptions, 'text'));

    const properties = {
      character: characterIsPresent ? characterOrText : undefined,
      text: characterIsPresent ? textOrOptions : characterOrText,
      options: characterIsPresent ? optionsOnly : textOrOptions
    }

    setProperties(this, properties);
  }
});
