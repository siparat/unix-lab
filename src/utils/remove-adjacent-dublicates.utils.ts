export const removeAdjacentDuplicates = <T>(arr: T[]): T[] => {
	if (arr.length == 0) {
		return [];
	}
	const result = [arr[0]];

	for (let i = 1; i < arr.length; i++) {
		const currentElement = arr[i];
		const lastAddedElement = result.at(-1);

		if (currentElement !== lastAddedElement) {
			result.push(currentElement);
		}
	}

	return result;
};
