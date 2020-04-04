import { createActions, handleActions } from 'redux-actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import xor from 'lodash/xor';

import CRITTER_DATA from 'data/db.json';
import { LOCAL_STORAGE_PREFIX } from 'config';

import { selectors as settingsSelectors } from 'modules/settings';
import { parseAndSortCritters, parseSimpleCritters } from 'utils/parseCritters';

const CRITTERS_CAUGHT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}_CAUGHT`;

const storageCritters = localStorage.getItem(CRITTERS_CAUGHT_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(CRITTERS_CAUGHT_STORAGE_KEY))
  : [];

// State
const defaultState = {
  data: CRITTER_DATA,
  caughtList: storageCritters,
};

// Selectors
export const selectors = {
  data: state => state.critters.data,
  caughtList: state => state.critters.caughtList,
  isCaughtId: (_, props) => props.id,
  type: (_, type) => type || 'BUG',
};

selectors.critters = createSelector(
  [selectors.data, selectors.caughtList, settingsSelectors.all],
  (critters, caughtList, settings) => {
    return parseAndSortCritters(critters, caughtList, settings);
  }
);

selectors.crittersByType = createSelector(
  [selectors.data, selectors.type, settingsSelectors.all],
  (critters, type, settings) => {
    const crittersParsed = parseSimpleCritters(critters, settings);
    const crittersOfType = filter(crittersParsed, { type });
    return orderBy(crittersOfType, 'name');
  }
);

selectors.isCaught = createSelector([selectors.isCaughtId, selectors.caughtList], (id, caughtList) => {
  return caughtList.includes(id);
});

// Actions
export const actions = createActions('REFRESH_CRITTERS', 'TOGGLE_CAUGHT', 'TOGGLE_CAUGHT_RESPONSE');

// Helpers
const updateStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Sagas
export function* toggleCaughtSaga({ payload: id }) {
  try {
    const caughtList = yield select(selectors.caughtList);
    const updatedCaughtList = xor(caughtList, [id]);
    yield call(updateStorage, CRITTERS_CAUGHT_STORAGE_KEY, updatedCaughtList);
    yield put(actions.toggleCaughtResponse(updatedCaughtList));
  } catch (e) {
    console.log(e);
  }
}

// Saga
export function* crittersSaga() {
  yield all([takeLatest(actions.toggleCaught, toggleCaughtSaga)]);
}

// Reducer
export default handleActions(
  {
    [actions.refreshCritters]: {
      next(state) {
        return {
          ...state,
          data: [...state.data],
        };
      },
    },
    [actions.toggleCaughtResponse]: {
      next(state, { payload: caughtList }) {
        return {
          ...state,
          caughtList,
        };
      },
    },
  },
  defaultState
);
