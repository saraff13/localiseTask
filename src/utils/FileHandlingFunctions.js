import RNFS from 'react-native-fs';
import {API} from './api';
import CryptoJS from 'crypto-js';

const path = RNFS.DocumentDirectoryPath + '/language.json';

export const writeLangFile = data => {
  let encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    'secret key 123',
  ).toString();
  console.log('encypted data', encryptedData);

  RNFS.writeFile(path, encryptedData, 'utf8')
    .then(success => {
      console.log('FILE WRITTEN!', success);
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const fetchSavedLangFile = (
  dispatch,
  setTranslationData,
  getTranslation,
) => {
  RNFS.readFile(path, 'utf8')
    .then(data => {
      let bytes = CryptoJS.AES.decrypt(data, 'secret key 123');
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log('decrypted data', decryptedData);
      // console.log('read Data => ', JSON.parse(data));
      dispatch(setTranslationData(decryptedData));
    })
    .catch(err => {
      console.log(err.message, err.code);
      dispatch(getTranslation(API.en));
    });
};
