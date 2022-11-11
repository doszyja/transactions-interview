
import React, { useState } from 'react';
import classNames from 'classnames';

import Input from 'front/common/components/Input/Input';
import { useAppDispatch } from 'front/store/store';

import styles from './TransactionForm.module.scss';
import { addTransactionByForm } from 'front/store/transactionSlice';
import { Transaction } from 'types/transaction';

const validateForm = (transaction: Transaction) => {
	const errors = [];
	let isValid = true;

	if (!transaction.amount) {
		errors.push('amount is empty');
		isValid = false;
	} else {
		if (isNaN(transaction.amount)) {
			errors.push('amount must be positive');
			isValid = false;
		}
	}

	if (!transaction.account) {
		errors.push('account is empty');
		isValid = false;
	} else {
		if (transaction.account !== undefined && isNaN(+transaction.account)) {
			errors.push('account must be number');
			isValid = false;
		}
	}

	return { errors, isValid };
};

type Message = {
	type: 'success' | 'error',
	message: string
}

const TransactionForm = () => {
	const dispatch = useAppDispatch();

	const [message, setMessage] = useState<Message>();
	const [amount, setAmount] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [account, setAccount] = useState<string>('');

	const resetForm = () => {
		setAmount('');
		setAddress('');
		setDescription('');
		setAccount('');
	};

	return <div className={styles.transactionForm}>
		<h3>New transaction</h3>
		<label htmlFor="amount" className={styles.label}>Amount:</label>
		<Input
			name="amount"
			type="number"
			step=".01"
			min="0"
			value={amount}
			className={classNames(styles.input, message?.type === 'error' ? styles.inputError : '')}
			onChange={(event) => setAmount(event.target.value)}
		/>
		<label htmlFor="account" className={styles.label}>Account:</label>
		<Input
			name="account"
			type="text"
			value={account}
			className={classNames(styles.input, message?.type === 'error' ? styles.inputError : '')}
			onChange={(event) => setAccount(event.target.value)}
		/>
		<label htmlFor="address" className={styles.label}>Address:</label>
		<Input
			name="address"
			type="text"
			value={address}
			className={classNames(styles.input, styles.inputHigher, message?.type === 'error' ? styles.inputError : '')}
			onChange={(event) => {
				const value = event.target.value;
				setAddress(value);
			}}
		/>
		<label htmlFor="description" className={styles.label}>Description:</label>
		<Input
			name="description"
			type="text"
			value={description}
			className={classNames(styles.input, styles.inputHigher, message?.type === 'error' ? styles.inputError : '')}
			onChange={(event) => {
				const value = event.target.value;
				setDescription(value);
			}}
		/>

		<div className={classNames(styles.message,
			(message?.type === 'error' ? styles.error : ''),
			(message?.type === 'success' ? styles.success : '')
		)}>
			{message?.message}
		</div>

		<button className={styles.button} onClick={() => {
			const date = new Date().toISOString();

			const transaction: Transaction = {
				id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
				amount: Number(amount),
				beneficiary: 'Marina Graves',
				account: String(account),
				address: String(address),
				date: date,
				description: String(description),
			};

			const { isValid, errors } = validateForm(transaction);

			if (isValid) {
				resetForm();
				setMessage({ type: 'success', message: 'Success! transaction added to the list' });
				return dispatch(addTransactionByForm(transaction));
			} else {
				let message = 'Error! ';

				errors.map(error => {
					message += `- ${error}`;
				});

				setMessage({ type: 'error', message: message });
			}
		}}>Submit</button>
	</div>;
};

export default TransactionForm;
