import { createActions, handleActions } from 'redux-actions';
import { all } from 'redux-saga/effects';

import { LOCAL_STORAGE_PREFIX } from 'config';

const SETTINGS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}_SETTINGS`;

const DEFAULT_SETTINGS = {
  critterType: 'ALL',
  hemisphere: 'N',
  month: 'ALL',
  viewMode: 'VIEW_ALL',
};

const storageGlobal = localStorage.getItem(SETTINGS_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY))
  : DEFAULT_SETTINGS;

// State
const defaultState = {
  ...DEFAULT_SETTINGS,
  ...storageGlobal,
};

// Selectors
export const selectors = {
  all: state => state.settings,
  critterType: state => state.settings.critterType,
  month: state => state.settings.month,
  hemisphere: state => state.settings.hemisphere,
  viewMode: state => state.settings.viewMode,
};

// Actions
export const actions = createActions('TOGGLE_SETTING');

// Saga
export function* settingsSaga() {
  yield all([]);
}

const updateStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Reducer
export default handleActions(
  {
    [actions.toggleSetting]: {
      next(state, { payload }) {
        const { key, value } = payload;
        const settings = { ...state, [key]: value };
        updateStorage(SETTINGS_STORAGE_KEY, settings);
        return settings;
      },
    },
  },
  defaultState
);
