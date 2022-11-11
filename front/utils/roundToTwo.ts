
export function roundToTwo(num: number) {
	if (isNaN(num)) {
		return 0;
	}
	return Math.round((num + Number.EPSILON) * 100) / 100;
}
