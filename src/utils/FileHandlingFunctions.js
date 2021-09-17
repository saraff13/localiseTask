import RNFS from 'react-native-fs';
import {API} from './api';

const path = RNFS.DocumentDirectoryPath + '/language.json';

export const writeLangFile = data => {
  RNFS.writeFile(path, JSON.stringify(data), 'utf8')
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const readLangFile = (dispatch, setTranslationData, getTranslation) => {
  RNFS.readFile(path, 'utf8')
    .then(data => {
      // console.log('read Data => ', JSON.parse(data));
      dispatch(setTranslationData(JSON.parse(data)));
    })
    .catch(err => {
      console.log(err.message, err.code);
      dispatch(getTranslation(API.en));
    });
};
