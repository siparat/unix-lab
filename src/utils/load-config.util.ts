import { config } from 'dotenv';

export const loadConfig = (): void => {
	const result = config();
	if (result.error) {
		throw new Error(result.error.message);
	}
	if (!result.parsed) {
		throw new Error('Конфиг .env пуст');
	}
};
