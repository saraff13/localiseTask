import React from 'react';
import {Text} from 'react-native';

import {useSelector} from 'react-redux';
import {readLangFile, updateLangFile} from './FileHandlingFunctions';

const FileDownload = () => {
  const data = useSelector(state => state.translateReducer.data);
  if (data) {
    updateLangFile(data);
    const readData = readLangFile();
    console.log(readData);
  }

  return <Text>Page Downloading</Text>;
};
export default FileDownload;
