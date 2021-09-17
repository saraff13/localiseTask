import {
  addLanguage,
  deleteLanguage,
  fetchSavedLanguage,
} from '../databases/schema';
import {API} from './api';

export const addLang = data => {
  const newLanguage = {
    id: data.id,
    name: data.name,
    how: data.how,
    boiledEgg: data.boiledEgg,
    softBoiledEgg: data.softBoiledEgg,
    choice: data.choice,
    active: 'true',
  };
  addLanguage(newLanguage)
    .then(() => console.log('successfully added'))
    .catch(error => console.log('realm addition error => ', error));
};

export const deleteLang = data => {
  deleteLanguage(data.id)
    .then(() => console.log('deletion success'))
    .catch(error => console.log('deletion error => ', error));
};

export const fetchSavedLang = (
  dispatch,
  setTranslationData,
  getTranslation,
) => {
  fetchSavedLanguage()
    .then(language => {
      if (language.length) dispatch(setTranslationData(language[0]));
      else dispatch(getTranslation(API.en));
    })
    .catch(error => console.log('fetch realm failed => ', error));
};
