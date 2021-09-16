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

export const getLanguageData = languageID =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let searchedLanguage = realm.objectForPrimaryKey('Lang', languageID);
          resolve(searchedLanguage);
        });
      })
      .catch(error => reject(error));
  });

export const updateStatus = (languageID, status) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let searchedLanguage = realm.objectForPrimaryKey('Lang', languageID);
          searchedLanguage.active = status;
          resolve(searchedLanguage);
        });
      })
      .catch(error => reject(error));
  });

export const filterActiveLanguage = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          const langugaes = realm.objects('Lang');
          const activeLang = langugaes.filtered("active='true'");
          resolve(activeLang);
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
