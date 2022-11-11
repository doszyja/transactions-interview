import { createSlice } from '@reduxjs/toolkit';

export interface AppSlice {
	visit?: boolean;
}

const initialState: AppSlice = {
	visit: undefined
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {

	}
});

export default appSlice.reducer;
