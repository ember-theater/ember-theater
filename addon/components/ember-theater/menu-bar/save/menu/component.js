import Ember from 'ember';
import Menu from 'ember-theater/components/ember-theater/menu-bar/menu/component';

const { get } = Ember;

const { computed: { reads } } = Ember;
const { inject: { service } } = Ember;

export default Menu.extend({
  header: 'ember-theater.menu.save.header',
  sceneManager: service('ember-theater/director/scene-manager'),
  menuClassNames: reads('config.menuBar.save.classNames'),

  populateChoices: async function() {
    const saves = await get(this, 'saveStateManager.saves');
    const choices = get(this, 'choices');

    // Position is important. New Game must be the second choice, as its position determines the way
    // this choice is resolved.
    choices.pushObject({
      icon: 'save',
      inputable: true,
      text: 'ember-theater.menu.save.new'
    });

    saves.forEach((save) => {
      if (!get(save, 'isAutosave')) {
        choices.pushObject({
          key: 'save',
          object: save,
          text: get(save, 'name'),
          classNames: ['et-choice-option-pair-major']
        });
        choices.pushObject({
          key: 'delete',
          object: save,
          icon: 'remove',
          classNames: ['et-choice-option-pair-minor']
        });
      }
    });
  },

  resolve(choice) {
    const saveStateManager = get(this, 'saveStateManager');
    const sceneRecord = get(this, 'sceneManager.sceneRecord');

    saveStateManager.setStateValue('_sceneRecord', sceneRecord);

    switch (get(choice, 'key')) {
      case 0: return this.attrs.closeMenu();
      case 1: saveStateManager.createRecord(get(choice, 'input')); break;
      case 'save': saveStateManager.updateRecord(get(choice, 'object')); break;
      case 'delete': saveStateManager.deleteRecord(get(choice, 'object')); break;
    }

    this.attrs.closeMenu();
  }
});
