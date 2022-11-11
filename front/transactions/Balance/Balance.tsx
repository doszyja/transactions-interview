
import React from 'react';
import styles from './Balance.module.scss';

type BalanceProps = {
	value: number;
}

const Balance = ({ value = 0 }: BalanceProps) => {
	return <div className={styles.balance}>
		Current Balance: {value}
	</div>;
};

export default Balance;
