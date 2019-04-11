'use babel';

// eslint-disable-next-line import/no-unresolved
import atom, { CompositeDisposable } from 'atom';
import PullFile from './pullFile';

export default {
  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pull-file-atom:pull': () => this.pull(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  pull() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      new PullFile(editor).pull();
    }
  },
};
