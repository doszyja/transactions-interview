import { RootState } from './store';

import { roundToTwo } from 'front/utils/roundToTwo';

export const getTransactions = (state: RootState) => state.transactions?.data ?? [];

export const getBalance = (state: RootState) => {
	let balance = 0;

	state.transactions.data.forEach(transaction => balance += transaction.amount);
	return roundToTwo(balance);
};

export const getBeneficiaryFilter = (state: RootState) => state.transactions?.filter ?? '';

export const isListFiltered = (state: RootState) => !!state.transactions.filter;

export const areTransactionsLoaded = (state: RootState) => state.transactions?.status === 'success';

export const isEmptyTransactionList = (state: RootState) => {
	return state.transactions.data?.length === 0;
};

export const isMaximumPageReached = (state: RootState) => {
	const { maxPage, page } = state.transactions;
	return maxPage !== undefined ? page < maxPage : true;
};
