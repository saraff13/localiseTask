import RNFS from 'react-native-fs';
import {API} from './api';
import CryptoJS from 'crypto-js';

const path = RNFS.DocumentDirectoryPath + '/language.json';
const bank_path = RNFS.DocumentDirectoryPath + '/bank.json';

export const writeLangFile = data => {
  let encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    'secret key 123',
  ).toString();
  RNFS.writeFile(path, encryptedData, 'utf8')
    .then(() => console.log('FILE WRITTEN!'))
    .catch(err => console.log(err.message));
};

export const fetchSavedLangFile = (
  dispatch,
  setTranslationData,
  getTranslation,
) => {
  RNFS.readFile(path, 'utf8')
    .then(data => {
      // console.log('read Data => ', JSON.parse(data));
      let bytes = CryptoJS.AES.decrypt(data, 'secret key 123');
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      dispatch(setTranslationData(decryptedData));
    })
    .catch(err => {
      console.log(err.message, err.code);
      dispatch(getTranslation(API.en));
    });
};

// Bank Functions

export const writeBankFile = data => {
  let encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    'bank secret key 123',
  ).toString();
  RNFS.writeFile(bank_path, encryptedData, 'utf8')
    .then(() => console.log('BANK FILE WRITTEN!'))
    .catch(err => console.log(err.message));
};

export const fetchSavedBankFile = (dispatch, setBanksData, getBanksData) => {
  RNFS.readFile(bank_path, 'utf8')
    .then(data => {
      // console.log('read Data => ', JSON.parse(data));
      let bytes = CryptoJS.AES.decrypt(data, 'bank secret key 123');
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      dispatch(setBanksData(decryptedData));
    })
    .catch(err => {
      console.log(err.message, err.code);
      dispatch(getBanksData(API.bank));
    });
};
