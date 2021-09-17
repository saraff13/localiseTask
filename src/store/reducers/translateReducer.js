import {addLang} from '../../utils/RealmFunctions';
import * as types from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.TRANSLATION_START:
      return {
        ...state,
        loading: true,
      };

    case types.TRANSLATION_SUCCESS:
      addLang(action.payload);
      return {
        ...state,
        data: action.payload,
      };

    case types.TRANSLATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case types.SET_TRANSLATION_DATA:
      addLang(action.payload);
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
