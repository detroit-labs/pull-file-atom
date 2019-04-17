'use babel';

/* eslint-disable no-undef */

import SelectList from 'atom-select-list';

export default class PullFileView {
  constructor(onSelect) {
    this.selectListView = new SelectList({
      items: [],
      elementForItem: (item) => {
        const li = document.createElement('li');
        li.classList.add('event', 'two-lines');
        li.textContent = item;
        return li;
      },
      selectQuery: true,
      didConfirmSelection: (item) => {
        this.hide();
        onSelect(item);
      },
      didCancelSelection: () => {
        this.hide();
      },
    });
  }

  // Returns an object that can be retrieved when package is activated
  // serialize() {}

  // Tear down any state and detach
  async destroy() {
    await this.selectListView.destroy();
  }

  hide() {
    this.panel.hide();
  }

  async show(fileNames) {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({ item: this.selectListView });
    }

    this.selectListView.reset();
    await this.selectListView.update({ items: fileNames });

    this.panel.show();
    this.selectListView.focus();
  }
}
