import { checkTcpdumpAvailability } from './utils/tcpdump-availability.util.js';

const bootstrap = async (): Promise<void> => {
	checkTcpdumpAvailability();
};

bootstrap();
