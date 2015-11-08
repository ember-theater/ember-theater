import Ember from 'ember';
import { Direction } from 'ember-theater';
import layerName from 'ember-theater/utils/layer-name';

const {
  get,
  inject,
  run
} = Ember;

export default Direction.extend({
  emberTheaterLayerManager: inject.service(),

  perform(resolve, layer, effect, options) {
    // const filterId = get(line, 'id');
    // const effect = filterId ? `url('/filters/${filterId}.svg#${filterId}')` : get(line, 'effect');
    const duration = get(options, 'duration') ? get(options, 'duration') : 0;

    get(this, 'emberTheaterLayerManager').addFilter(effect, duration, layerName(layer));
  }
});
