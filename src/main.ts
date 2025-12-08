import { createServer, Server } from 'net';
import { appendFile } from 'fs/promises';
import { join } from 'path';
import { parseConfig } from './utils/parse-config';

const PATH_TO_LOGFILE: string = join(__dirname, '..', 'activity.txt');

const lastAccessTime = new Map<string, number>();
const historyIps = new Set<string>();

const logActivity = async (ipAddress: string, port: number, timeout: number): Promise<void> => {
	try {
		const currentTime = new Date().toISOString();
		const logEntry = `[${currentTime}] Обнаружена подозрительная активность с IP за последние ${timeout / 1000} секунд: ${ipAddress}. Порт: ${port}\n`;
		
		await appendFile(PATH_TO_LOGFILE, logEntry);
		
		console.log(logEntry);
	} catch (err) {
		if (err instanceof Error) {
			console.error(`Ошибка записи в файл: ${err.message}`)
		}
	}
}

const checkAndUpdateIp = (ipAddress: string, port: number, timeout: number): void => {
    const currentTimestamp = Date.now();
    const lastAccess = lastAccessTime.get(ipAddress) || 0;
    
    const timeSinceLastAccess = currentTimestamp - lastAccess;
    
    if (timeSinceLastAccess <= timeout && !historyIps.has(ipAddress)) {
		historyIps.add(ipAddress);
		logActivity(ipAddress, port, timeout);
    }

	if (timeSinceLastAccess > timeout) {
		historyIps.delete(ipAddress);
	}
    
    lastAccessTime.set(ipAddress, currentTimestamp);
}

const createMonitorServer = (port: number, timeout: number): Server => {
    const server = createServer((socket) => {
        const ipAddress = socket.remoteAddress;

        if (ipAddress) {
            const cleanIp = ipAddress.startsWith('::ffff:') ? ipAddress.slice(7) : ipAddress;

            console.log(`Запрос на порт: ${port} от ${cleanIp}`);
            checkAndUpdateIp(cleanIp, port, timeout);
        }

        socket.destroy(); 
    });

    server.listen(port, '0.0.0.0', () => {
        console.log(`Сервер запущен на порту: ${port}`);
    }).on('error', (err: any) => {
		console.error(`Ошибка при запуске сервера на порту ${port}: ${err.message}`);
    });
    
    return server;
}

const main = async (): Promise<void> => {
	const config = await parseConfig();

    for (const port of config.ports) {
        createMonitorServer(port, config.timeout);
    }
}

main();