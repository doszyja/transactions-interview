import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import DefaultLayout from 'front/layout/DefaultLayout/DefaultLayout';

import { useAppDispatch } from 'front/store/store';
import { fetchTransactions } from 'front/store/transactionSlice';

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const initRef = useRef(true);

	useEffect(() => {
		if (initRef.current) {
			initRef.current = false;

			dispatch(fetchTransactions());
		}
	}, [dispatch, fetchTransactions, initRef]);

	return (
		<>
			<Head>
				<title>Transactions</title>
				<meta name="description" content="Welcome to your transactions history" />
			</Head>
			<DefaultLayout />
		</>
	);
};

export default Home;
