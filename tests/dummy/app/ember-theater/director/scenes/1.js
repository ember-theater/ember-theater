import { Scene } from 'ember-theater/ember-theater/director';

export default Scene.extend({
  name: 'The Beach',

  script: async function() {
    // await this.choice('1.choice1.header', [{ text: { id: '1.choice1.A', options: { opt1: 'OOO' } } }, '1.choice1.B']);
    // await this.text('steven', '1.noId');
    // await this.choice('1.choice1.header', [{ text: { id: '1.choice1.A', options: { opt1: 'OOO' } } }, '1.choice1.B']);
    // await this.text('steven', '1.noId');
    // await this.choice('1.choice1.header', [{ text: { id: '1.choice1.A', options: { opt1: 'OOO' } } }, '1.choice1.B']);
    // await this.text('steven', '1.noId');
    // this.filter('theater.prompt', ['blur(0px)', 'blur(10px)'], { duration: 1000 });
    // await this.text('steven', '1.noId');
    // this.filter('theater.prompt', ['blur(10px)', 'blur(0px)'], { duration: 1000, destroy: true });
    // await this.text('steven', '1.noId');
    // await this.text({ id: 'steven', displayName: '1.noId' }, { id: '1.firstTest', options: { val1: 'my friend' } });
    // await this.pause(100);
    // await this.backdrop('beach');
    // await this.pause(10);
    // this.sound('song__bolero', 'fadeIn', { duration: 1000 });
    // this.text('text 1', { instance: 1, keys: { accept: [] }, decorativeClassNames: ['et-transparent'], style: { position: 'absolute', top: 0, left: 0 } });
    // await this.text('steven', 'I was <strong>so happy</strong> when ((#instant)) Garnet said she was gonna come on this trip with me and Dad! ((/instant)) (Ruby and Sapphire look at each other and frown) Home\'s been awful! Here\'s been awful! I thought you wanted to have a fun time but, everyone\'s been acting awful too! It-It just came with us! I don\'t understand! (He looks at the ground) Is it- is it me?');
    // this.filter('theater.text', 'blur(0)', { duration: 500 });
    // this.backdrop('beach--night', { duration: 5000 });
    await this.character('steven', { left: '50%', opacity: 1 }, { duration: 500 });
    await this.pause(500);
    await this.expression('steven', 'steven--jumping');
    this.script();
    // this.text('text 2 ((#effect { rotateZ: 2.5 } | { duration: 100, loop: true }))', { instance: 1 });
    //
    // const choiceOne = await this.choice('What should I do?', ['Whirl!', { key: 'B', text: 'Jump!' }, 'Play Bolero!', 'Something', 'Filler', 'A really long statement, just becuase you know there will be users who have these too. Hell, you will probably create a few of these yourself. You know?', 'Here is another short statement.', 'Okay, that last one was still kind of long.', 'Really actually totally short.', 'Okay, really really short.', 'Truly short.', 'Short and sweet.', 'Shorter.', 'S']);
    //
    // switch (choiceOne.key) {
    //   case 0: await this.expression('steven', 'steven--jumping', { transitionIn: { effect: 'transition.whirlIn', options: { duration: 1000 } }, transitionOut: { effect: 'transition.whirlOut', options: { duration: 1000 } } }); break;
    //   case 'B': await this.character('steven', 'callout.bounce', { duration: 1000 }); break;
    //   case 2: this.sound('song__bolero'); break;
    // }
    // await this.text('steven', 'How was that?!');
    // this.setData('test', 0);
    // this.transitionToScene(1, { transitionOut: 'transition.whirlOut', transitionOutDuration: 1000 });
    //
    // await this.codeChallenge([{ code: 'let two = 1 + 1;', readOnly: true }, { }, { code: 'return two;', readOnly: true }]);
    // await this.text('steven', 'How was that?!');
  }
});
