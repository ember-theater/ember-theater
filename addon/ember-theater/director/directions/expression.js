import Ember from 'ember';
import { Direction } from 'ember-theater/ember-theater/director';

const { get } = Ember;
const { inject: { service } } = Ember;

export default Direction.extend({
  fixtureStore: service('ember-theater/fixture-store'),
  stageManager: service('ember-theater/director/stage-manager'),

  /**
    Provide a description of what your direction does.

    @method perform
    @for Scene
    @param {*} exampleParam
  */

  perform(resolve, characterId, expressionId, options = {}) {
    const stageManager = get(this, 'stageManager');
    const instanceId = get(options, 'instance') || 0;
    const directable = stageManager.findDirectableWithId(characterId, 'character', instanceId);
    const character = get(directable, 'component');
    const expression = get(this, 'fixtureStore').find('characterExpressions', expressionId);

    character.changeExpression(resolve, expression, options);
  }
});
