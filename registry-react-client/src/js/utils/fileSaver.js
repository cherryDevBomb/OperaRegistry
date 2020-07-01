import {saveAs} from 'file-saver'

export default (fileData, fileName) => saveAs(fileData, fileName);