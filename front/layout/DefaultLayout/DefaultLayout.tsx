
import React from 'react';
import styles from './DefaultLayout.module.scss';

import Navbar from 'front/layout/Navbar/Navbar';
import Footer from 'front/layout/Footer/Footer';

import TransactionContainer from 'front/transactions/TransactionContainer/TransactionContainer';

const DefaultLayout = () => {

	return <div className={styles.defaultLayout}>
		<Navbar />
		<TransactionContainer />
		<Footer />
	</div>;
};

export default DefaultLayout;
