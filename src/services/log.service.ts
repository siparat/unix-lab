import { appendFile } from 'fs/promises';
import type { PackageHandlerHistoryItem } from '../interfaces/package-handler.interfaces.js';
import { ensureFileSync } from 'fs-extra';
import { removeAdjacentDuplicates } from '../utils/remove-adjacent-dublicates.utils.js';

export class Logger {
	static log(string: string): void {
		const path = process.env.PATH_TO_LOGFILE!;
		ensureFileSync(path);
		const log = `[${new Date().toISOString()}] ${string}\n`;
		console.log(path, log);
		appendFile(path, log);
	}

	static logIntruder(item: PackageHandlerHistoryItem): void {
		const string = `Обнаружена подозрительная активность с IP ${item.fromIp}, с этого IP были отправлены запросы на порты в такой последовательности: ${removeAdjacentDuplicates(item.ports).join(', ')}`;
		Logger.log(string);
	}
}
