import * as types from '../actionTypes';

export const getBanksData = payload => ({
  type: types.GET_BANKS_DATA_START,
  payload,
});

export const setBanksData = payload => ({
  type: types.SET_BANKS_DATA,
  payload,
});
