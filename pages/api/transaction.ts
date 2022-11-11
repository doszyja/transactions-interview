// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { roundToTwo } from 'front/utils/roundToTwo';
import { Transaction } from 'types/transaction';

import dbDataJson from '../../db.json';

type Data = {
	data: Transaction[];
	maxPage: number;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { page } = req.query;

	const pageNumber = Number(page);

	const transactions = dbDataJson.transactions.sort((a, b) => {
		const aDate = new Date(b.date);
		const bDate = new Date(a.date);
		return aDate.getTime() - bDate.getTime();
	});
	const maxPage = Math.ceil(transactions.length / 20);

	if (pageNumber > maxPage) {
		res.status(200).json({ data: [], maxPage: maxPage });
	}
	const slice = transactions.slice(20 * pageNumber, 20 * (pageNumber + 1));
	slice.forEach(transaction => {
		transaction.amount = roundToTwo(transaction.amount);
	});

	res.status(200).json({ data: slice, maxPage: maxPage });
}
