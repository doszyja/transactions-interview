import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';

import appSlice from './appSlice';
import transactionSlice from './transactionSlice';

const rootReducer = combineReducers({
	app: appSlice,
	transactions: transactionSlice
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		devTools: { name: 'app' },
		preloadedState,
	});

export const store = setupStore();
export const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
