import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsExclamationCircle } from 'react-icons/bs';

import { getTransactions, isEmptyTransactionList, isMaximumPageReached, areTransactionsLoaded } from 'front/store/selectors';

import TransactionItem from 'front/transactions/TransactionItem/TransactionItem';
import useInfiniteScroll from 'front/hooks/useInfiniteScroll';

import styles from './TransactionList.module.scss';
import { useAppDispatch } from 'front/store/store';
import { removeTransaction } from 'front/store/transactionSlice';
import { TransactionId } from 'types/transaction';

const TransactionEmptyList = () => <div className={styles.noResults}>
	<BsExclamationCircle />
	<h3>No results found</h3>
</div>;

const TransactionList = () => {
	const dispatch = useAppDispatch();
	const transactions = useSelector(getTransactions);
	const isEmptyList = useSelector(isEmptyTransactionList);
	const isReady = useSelector(areTransactionsLoaded);

	const parentRef = useRef<HTMLDivElement>(null);
	const shouldLoad = useSelector(isMaximumPageReached);

	useInfiniteScroll(parentRef, shouldLoad);

	const onRemove = (id: TransactionId) => dispatch(removeTransaction(id));

	return <div ref={parentRef} className={styles.transactionList}>
		<h3 className={styles.title}> Transaction history </h3>

		{isEmptyList && isReady ?
			<TransactionEmptyList />
			:
			(transactions.map((transaction) => {
				const { id } = transaction;

				return <TransactionItem key={id} onRemove={onRemove} transaction={transaction} />;
			}))}
	</div>;
};

export default TransactionList;
