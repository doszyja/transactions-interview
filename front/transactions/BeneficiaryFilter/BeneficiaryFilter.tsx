

import React, { useEffect, useState } from 'react';

import { useAppDispatch } from 'front/store/store';
import { updateData, updateFilter } from 'front/store/transactionSlice';

import styles from './BeneficiaryFilter.module.scss';
import Input from 'front/common/components/Input/Input';

const BeneficiaryFilter = () => {
	const [beneficiary, setBeneficiary] = useState('');
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(updateFilter(beneficiary)).finally(() => {
			dispatch(updateData());
		});

	}, [beneficiary]);

	return <div className={styles.filter}>
		<div className={styles.label}>Filter by:</div>
		<Input
			className={styles.input}
			name="beneficiary"
			placeholder="Beneficiary"
			type="text"
			onChange={(event) => {
				const value = event.target.value;
				setBeneficiary(value);
			}}
		/>
	</div>;
};

export default BeneficiaryFilter;
