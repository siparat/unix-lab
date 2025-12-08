import { readFile } from 'fs/promises';
import { Config } from '../interfaces';
import { isConfig } from '../typeguards/config.typeguard';
import { join } from 'path';

export const parseConfig = async (): Promise<Config> => {
	const pathToConfig: string = process.env.PATH_TO_CONFIG || join(process.cwd(), './config.json');

	try {
		const data = await readFile(pathToConfig, { encoding: 'utf-8' });
		const json = JSON.parse(data);

		if (!isConfig(json)) {
			throw new Error('Файл конфига невалидный, используйте пример из директории')
		}

		return json;
	} catch (error) {
		if (error instanceof Error && error.message.startsWith('ENOENT')) {
			throw new Error(`Файл конфига не найден (${pathToConfig})`)
		}
		throw error
	}
}