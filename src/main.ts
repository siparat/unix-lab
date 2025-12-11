import { startMonitoring } from './monitoring.js';
import { loadConfig } from './utils/load-config.util.js';
import { checkTCPDumpAvailability } from './utils/tcpdump-availability.util.js';

const bootstrap = async (): Promise<void> => {
	loadConfig();
	checkTCPDumpAvailability();
	await startMonitoring();
};

bootstrap();
