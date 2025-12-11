import { config } from 'dotenv';

export const loadConfig = (): void => {
	const result = config();
	if (result.error) {
		throw new Error(result.error.message);
	}
	if (!result.parsed) {
		throw new Error('Конфиг .env пуст');
	}
	configIsValid();
};

const configIsValid = (): boolean => {
	if (!process.env.INTERFACE) {
		throw new Error('Не указан "INTERFACE" в конфиге');
	}
	if (!process.env.PATH_TO_LOGFILE) {
		throw new Error('Не указан "PATH_TO_LOGFILE" в конфиге');
	}
	if (!process.env.PORTS) {
		throw new Error('Не указан "PORTS" в конфиге');
	}

	const ports = process.env.PORTS.split(',').map((p) => Number(p));
	if (!ports.length) {
		throw new Error('Список портов пуст');
	}
	if (!ports.every((p) => !Number.isNaN(p))) {
		throw new Error('Порты должны быть числами разделенными запятой');
	}

	return true;
};
