import * as types from '../actionTypes';

export const getTranslation = payload => ({
  type: types.TRANSLATION_START,
  payload,
});

export const setTranslationData = payload => ({
  type: types.SET_TRANSLATION_DATA,
  payload,
});
