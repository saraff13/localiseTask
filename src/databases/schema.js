import Realm from 'realm';

export const Lang = {
  name: 'Lang',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    how: 'string',
    boiledEgg: 'string',
    softBoiledEgg: 'string',
    choice: 'string',
    active: 'string',
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

export const fetchSavedLanguage = () =>
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
