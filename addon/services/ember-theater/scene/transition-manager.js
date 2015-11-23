import Ember from 'ember';

const {
  Service,
  get,
  isPresent
} = Ember;

const { inject: { service } } = Ember;

export default Service.extend({
  saveStateManager: service('ember-theater/save-state-manager'),
  sceneManager: service('ember-theater/scene-manager'),

  toScene(id, options) {
    this._abortPreviousScene();

    const sceneManager = get(this, 'sceneManager');
    const scene = this._buildScene(id, options);

    sceneManager.setIsLoading(get(options, 'isLoading'));
    sceneManager.resetSceneRecord();

    this._updateAutosave(scene, options);

    return scene;
  },

  _abortPreviousScene() {
    const scene = get(this, 'sceneManager.scene');

    if (isPresent(scene)) { scene.abort(); }
  },

  _buildScene(id, options) {
    const factory = this.get('container').lookupFactory(`scene:${id}`);

    return factory.create({
      id,
      options
    });
  },

  _updateAutosave: async function(scene, options) {
    if (get(options, 'autosave') === false) { return; }

    const saveStateManager = get(this, 'saveStateManager');
    const autosave = await get(saveStateManager, 'autosave');

    saveStateManager.appendActiveState({
      sceneId: get(scene, 'id'),
      sceneName: get(scene, 'name') || get(scene, 'id')
    });

    saveStateManager.updateRecord(autosave);
  }
});