'use babel';

/* eslint-disable no-undef */

// eslint-disable-next-line import/no-unresolved
import { File, Directory } from 'atom';
import { dirname } from 'path';
import PullFileView from './pull-file-view';

export default class PullFile {
  constructor(editor) {
    this.view = new PullFileView(item => this.onSelect(item));
    this.editor = editor;
    this.activeFilepath = this.editor.getPath();
    this.activeFolder = dirname(this.activeFilepath);
  }

  getFilesInFolder() {
    const directory = new Directory(this.activeFolder);
    return directory.getEntriesSync().filter(entry => entry.isFile());
  }

  selectFile(files) {
    const fileNames = files.map(file => file.getBaseName());
    this.view.show(fileNames);
  }

  pull() {
    const files = this.getFilesInFolder();
    this.selectFile(files);
  }

  async onSelect(file) {
    const filePath = `${this.activeFolder}/${file}`;
    const selectedFile = new File(filePath);
    this.editor.setText(await selectedFile.read());
    this.editor.save();
  }
}
