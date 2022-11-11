import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Transaction, TransactionId, TransactionAction } from 'types/transaction';
import { RootState } from './store';

type ACTION_STATUS = 'error' | 'loading' | 'success' | 'init';

export interface TransactionSlice {
	status: ACTION_STATUS;

	balance: number;
	responseData: Transaction[];
	removedData: TransactionId[];
	data: Transaction[];
	filter: string;

	page: number;
	maxPage?: number;
}

const initialState: TransactionSlice = {
	status: 'init',

	balance: 0,
	responseData: [],
	removedData: [],
	data: [],
	filter: '',

	page: 0,
	maxPage: undefined,
};

export const updateFilter = createAsyncThunk(
	'transactions/setFilter',
	async (filter: string, thunkAPI) => {
		await thunkAPI.dispatch(setFilter(filter));
		return thunkAPI.dispatch(updateData());
	},
);

export const addTransactionByForm = createAsyncThunk(
	'transactions/addTransactionByForm',
	async (transaction: Transaction, thunkAPI) => {
		await thunkAPI.dispatch(addTransaction(transaction));
		return thunkAPI.dispatch(updateData());
	},
);

export const removeTransaction = createAsyncThunk(
	'transactions/removeTransaction',
	async (id: TransactionId, thunkAPI) => {
		await thunkAPI.dispatch(addRemovedTransaction(id));
		return thunkAPI.dispatch(updateData());
	},
);

export const fetchTransactions = createAsyncThunk(
	'transactions/fetch',
	async (_, thunkAPI) => {
		const state = thunkAPI.getState() as RootState;
		const { status, page, data } = state.transactions;

		if (status === 'loading') {
			return thunkAPI.rejectWithValue('Connection is already pending');
		}

		try {
			const response = await fetch(`/api/transaction?page=${page}`);
			const transactions = await response.json();

			if (data.length === 0) {
				await thunkAPI.dispatch(setTransactions(transactions));
			} else {
				await thunkAPI.dispatch(addTransactions(transactions));
			}

			await thunkAPI.dispatch(updateData());
			return thunkAPI.dispatch(setStatus('success'));

		} catch (error) {
			thunkAPI.dispatch(setStatus('error'));
			return thunkAPI.rejectWithValue('Connection has problem');
		}
	});

export const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setTransactions: (state, action: PayloadAction<TransactionAction>) => {
			if (state.page <= action.payload.maxPage) {
				state.page += 1;
			}
			state.maxPage = action.payload.maxPage;
			state.responseData = action.payload.data;
		},

		addTransactions: (state, action: PayloadAction<TransactionAction>) => {
			if (state.page <= action.payload.maxPage) {
				state.page += 1;
			}

			state.maxPage = action.payload.maxPage;
			state.responseData = [...state.responseData, ...action.payload.data];
		},

		addTransaction: (state, action: PayloadAction<Transaction>) => {
			state.responseData = [...state.responseData, action.payload];
		},

		addRemovedTransaction: (state, action: PayloadAction<TransactionId>) => {
			state.removedData.push(action.payload);
		},

		setStatus: (state, action: PayloadAction<ACTION_STATUS>) => {
			state.status = action.payload;
		},

		setFilter: (state, action: PayloadAction<string>) => {
			state.filter = action.payload;
		},

		updateData: (state) => {
			state.data = state.responseData;

			// Filter elements base on beneficiary filter value;
			if (state.filter) {
				state.data = state.responseData.filter(transaction => {
					const compareValue = state.filter.toLowerCase();
					const beneficiary = transaction.beneficiary.toLowerCase();

					return beneficiary.includes(compareValue);
				});
			}

			// Exclude removed elements
			state.data = state.data.filter(transaction => !state.removedData.includes(transaction.id));
		},
	}
});

export const { setTransactions, addTransactions, addTransaction, addRemovedTransaction, setStatus, setFilter, updateData } = transactionSlice.actions;

export default transactionSlice.reducer;
