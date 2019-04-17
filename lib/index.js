'use babel';

/* eslint-disable no-undef */

// eslint-disable-next-line import/no-unresolved
import { CompositeDisposable } from 'atom';
import PullFile from './pull-file';

export default {
  subscriptions: null,
  panel: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that pulls a file
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pull-file:pull': () => this.pull(),
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
