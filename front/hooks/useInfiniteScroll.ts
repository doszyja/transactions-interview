import { RefObject, useEffect } from 'react';

import { useAppDispatch } from 'front/store/store';
import { fetchTransactions } from 'front/store/transactionSlice';


const THRESHOLD = 0;

const calculateTopPosition = (el: HTMLElement | null): number => {
	if (!el) {
		return 0;
	}

	const offsetParent = el.offsetParent as HTMLElement;
	return el.offsetTop + calculateTopPosition(offsetParent);
};

const calculateOffset = (el: HTMLElement, scrollTop: number): number => {
	if (!el) {
		return 0;
	}

	return calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
};

const useInfiniteScroll = (parentRef: RefObject<HTMLElement>, shouldLoad = true) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		let isAlreadyPending = false;

		const onScroll = () => {

			const parentNode = parentRef.current;

			if (parentNode === null || isAlreadyPending || !shouldLoad) {
				return;
			}

			const doc = document.documentElement || document.body.parentNode || document.body;
			const scrollTop = window.scrollY !== undefined ? window.scrollY : doc.scrollTop;
			const offset = calculateOffset(parentNode, scrollTop);

			if (offset < THRESHOLD && parentNode && parentNode.offsetParent !== null) {
				isAlreadyPending = true;

				dispatch(fetchTransactions()).finally(() => {
					isAlreadyPending = false;
				});
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => window.removeEventListener('scroll', onScroll);
	}, [dispatch, parentRef, shouldLoad]);
};

export default useInfiniteScroll;
