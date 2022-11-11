import React from 'react';
import { useSelector } from 'react-redux';

import { getBalance } from 'front/store/selectors';

import Balance from 'front/transactions/Balance/Balance';
import BeneficiaryFilter from 'front/transactions/BeneficiaryFilter/BeneficiaryFilter';
import TransactionList from 'front/transactions/TransactionList/TransactionList';
import TransactionForm from 'front/transactions/TransactionForm/TransactionForm';

import styles from './TransactionContainer.module.scss';

const TransactionContainer = () => {
	const balance = useSelector(getBalance);

	return <div className={styles.transactionContainer}>
		<div className={styles.options}>
			<Balance value={balance} />
			<BeneficiaryFilter />
		</div>

		<TransactionForm />
		<TransactionList />
	</div>;
};

export default TransactionContainer;
