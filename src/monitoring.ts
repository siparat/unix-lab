import { spawn } from 'child_process';
import { extractDataFromTCPDumpChunk } from './mappers/tcpdump.mapper.js';

export const startMonitoring = async (): Promise<void> => {
	const args = ['-i', process.env.INTERFACE!, '-n', '-l', '-q', '-t', 'tcp'];
	const runningProcess = spawn('sudo', ['tcpdump', ...args]);

	runningProcess.stdout.on('data', (buffer: Buffer) => {
		const chunk: string = buffer.toString('utf-8');
		const obj = extractDataFromTCPDumpChunk(chunk);
		console.log(obj);
	});

	runningProcess.stderr.on('data', (data) => {
		const errorMsg = data.toString();
		console.error(`Ошибка при запуске процесса: ${errorMsg.trim()}`);
	});

	runningProcess.on('error', (err) => {
		console.error('\nОшибка при запуске процесса:', err.message);
	});

	runningProcess.on('exit', (code) => {
		console.log(`\nПроцесс завершился с кодом ${code}`);
	});
};
