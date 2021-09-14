import Realm from 'realm';

export const Lang = {
  name: 'Lang',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    how: 'string',
    boiledEgg: 'string',
    softBoiledEgg: 'string',
    choice: 'string',
  },
};

const databaseOptions = {
  path: 'demo.realm',
  schema: [Lang],
};

export const addLanguage = language =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create('Lang', language);
          resolve(language);
        });
      })
      .catch(error => reject(error));
  });

export const deleteLanguage = languageID =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingLanguage = realm.objectForPrimaryKey('Lang', languageID);
          realm.delete(deletingLanguage);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const queryAllLanguages = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allLanguage = realm.objects('Lang');
          resolve(allLanguage);
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);

// export default class RealmStore extends Component {
//   render() {
//     async function deleteHandler() {
//       const realm = await Realm.open({
//         schema: [Lang],
//       });

//       let task = realm.objects('Lang')[0];
//       let englishTranslate = realm.objects('Lang');
//       console.log(englishTranslate);
//       realm.write(() => {
//         realm.delete(task);
//         task = null;
//       });
//       englishTranslate = realm.objects('Lang');
//       console.log(englishTranslate);
//     }
//     async function f() {
//       const realm = await Realm.open({
//         schema: [Lang],
//       });
//       let task1, task2;
//       realm.write(() => {
//         task1 = realm.create('Lang', {
//           _id: 1,
//           name: 'en',
//           how: 'How do you want your egg today',
//           boiledEgg: 'Boiled egg',
//           softBoiledEgg: 'Soft-boiled egg',
//           choice: 'How to choose the egg',
//         });
//       });

//       const englishTranslate = realm.objects('Lang');
//       console.log(englishTranslate);
//     }

//     return (
//       <View>
//         <Button title={'Realm Button'} onPress={() => f()}></Button>
//         <Button
//           title={'Realm  Button delete'}
//           onPress={() => deleteHandler()}></Button>
//       </View>
//     );
//   }
// }
