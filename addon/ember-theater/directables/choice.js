import Ember from 'ember';
import { Directable } from 'ember-theater';

const {
  isPresent,
  setProperties,
  typeOf
} = Ember;

export default Directable.extend({
  componentType: 'ember-theater/director/choice',
  layer: 'theater.text.choice',

  parseArgs(headerOrChoices, choicesOrOptions, optionsOnly) {
    const headerIsPresent = typeOf(headerOrChoices) === 'string';

    const properties = {
      header: headerIsPresent ? headerOrChoices : undefined,
      choices: headerIsPresent ? choicesOrOptions : headerOrChoices,
      options: headerIsPresent ? optionsOnly : choicesOrOptions
    }

    setProperties(this, properties);
  }
});
