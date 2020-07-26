import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

/*
 This bit enables Hot Module Replacement (HMR) for the store when in dev/local.
 Any time a reducer is updated, it's reloaded here without reloading the page.
 */
const devEnv = ['development', 'local'];
if (devEnv.includes(process.env.NODE_ENV) && (module as any).hot) {
  (module as any).hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
