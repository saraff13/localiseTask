import React, {Component} from 'react';
import {Text} from 'react-native';
import RNFS from 'react-native-fs';

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
class FileDownload extends Component {
  render() {
    var path = RNFS.DocumentDirectoryPath + '/hindi.json';

    var data = {
      firstName: 'Rajesh',
      lastName: 'Kumar',
      gender: 'man',
      age: 24,
      address: {
        streetAddress: '126 Udhna',
        city: 'Surat',
        state: 'GJ',
        postalCode: '394221',
      },
      phoneNumbers: [{type: 'home', number: '7383627627'}],
    };

    console.log(path);
    RNFS.writeFile(path, JSON.stringify(data), 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });

    RNFS.readFile(path, 'utf8')
      .then(res => {
        console.log(res);
        console.log(JSON.parse(res).firstName);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
    return <Text>Page Downloading</Text>;
  }
}
export default FileDownload;
