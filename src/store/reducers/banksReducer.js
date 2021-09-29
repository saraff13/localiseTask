import {writeBankFile} from '../../utils/FileHandlingFunctions';
import * as types from '../actionTypes';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_BANKS_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case types.GET_BANKS_DATA_SUCCESS:
      writeBankFile(action.payload);
      return {
        ...state,
        data: action.payload,
      };

    case types.GET_BANKS_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case types.SET_BANKS_DATA:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
