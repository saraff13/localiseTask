import RNFS from 'react-native-fs';

const path = RNFS.DocumentDirectoryPath + '/language.json';

export const updateLangFile = data => {
  RNFS.writeFile(path, JSON.stringify(data), 'utf8')
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const readLangFile = () => {
  RNFS.readFile(path, 'utf8')
    .then(res => {
      console.log('read Data => ', res);
      resolve(res);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
};
