import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import { Transaction } from 'types/transaction';

import styles from './TransactionItem.module.scss';

type TransactionItemProps = {
	transaction: Transaction;
	onRemove: (id: number) => void;
}

const TransactionItem = ({ transaction, onRemove }: TransactionItemProps) => {
	const alreadyDeleted = useRef(false);
	const [isRemoveAnimation, setRemoveAnimation] = useState(false);

	const { id, amount, beneficiary, account, address, date, description } = transaction;
	const formatDate = new Date(date).toLocaleDateString();

	return <div className={classNames(styles.transactionItem, isRemoveAnimation ? styles.transactionRemoveAnimation : '')}>
		<div className={styles.date}>Day {formatDate}</div>

		<div className={styles.row}>
			<div className={styles.details}>
				<div className={styles.beneficiary}>{beneficiary}</div>
				<span className={styles.label}>{description}</span>
				<span className={styles.label}>{address}</span>
				<div className={styles.account}>{account}</div>
			</div>
			<div className={styles.amount}>{amount} $</div>
		</div>
		<div className={styles.removeLabel} onClick={() => {
			if (alreadyDeleted.current) return;

			alreadyDeleted.current = true;
			setRemoveAnimation(true);

			setTimeout(() => {
				onRemove(id);
			}, 400);
		}}>Remove</div>
	</div>;
};

export default TransactionItem;
