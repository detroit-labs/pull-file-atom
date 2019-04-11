// eslint-disable-next-line import/no-unresolved
import { Directory } from 'atom';
import { dirname } from 'path';

export default class PullFile {
  constructor(editor) {
    this.editor = editor;
    this.activeFilePath = editor.getPath();
    this.activeFolder = dirname(this.activeFilePath);
  }

  pull() {
    this.getFilesInFolder();
  }

  getFilesInFolder() {
    const directory = new Directory(this.activeFolder);
    return directory.getEntriesSync().filter(entry => entry.isFile());
  }
}
