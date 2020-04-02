import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
// import { connectRouter } from 'connected-react-router';

import critters, { crittersSaga } from './critters';
import modal from './modal';
import settings, { settingsSaga } from './settings';
import toast from './toast';

export function* rootSaga() {
  yield all([crittersSaga(), settingsSaga()]);
}

export const rootReducer = history => {
  return combineReducers({
    // router: connectRouter(history),
    critters,
    modal,
    settings,
    toast,
  });
};
