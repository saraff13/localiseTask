import * as types from '../actionTypes';

export const getTranslation = payload => ({
  type: types.TRANSLATION_START,
  payload,
});
