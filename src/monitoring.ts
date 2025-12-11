import { spawn } from 'child_process';
import { PackageHandler } from './services/package-handler.service.js';
import { CronJob } from 'cron';

export const startMonitoring = async (): Promise<void> => {
	const args = ['-i', process.env.INTERFACE!, '-n', '-l', '-q', '-t', 'tcp'];
	const runningProcess = spawn('sudo', ['tcpdump', ...args]);

	const packageHandler = new PackageHandler();

	CronJob.from({
		cronTime: '*/10 * * * * *',
		onTick: packageHandler.checkHistoryForIntruders.bind(packageHandler),
		start: true
	});

	runningProcess.stdout.on('data', packageHandler.handle.bind(packageHandler));

	runningProcess.on('error', (err) => {
		console.error('\nОшибка при запуске процесса:', err.message);
	});

	runningProcess.on('exit', (code) => {
		console.log(`\nПроцесс завершился с кодом ${code}`);
	});
};
