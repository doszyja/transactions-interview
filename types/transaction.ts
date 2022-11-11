
export type Transaction = {
	id: TransactionId;
	amount: number;
	beneficiary: string;
	account: string;
	address: string;
	date: string;
	description: string;
}

export type TransactionId = number;

export type TransactionAction = {
	data: Transaction[],
	maxPage: number,
	balance: number,
}
