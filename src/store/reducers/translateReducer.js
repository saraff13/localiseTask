import * as types from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      AsyncStorage.setItem('Lang', JSON.stringify(action.payload));
      return {
        ...state,
        data: action.payload,
      };

    case types.TRANSLATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
