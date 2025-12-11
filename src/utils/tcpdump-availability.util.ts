import { exec } from 'child_process';

export const checkTcpdumpAvailability = async (): Promise<true> => {
	return await new Promise((res, rej) => {
		exec('which tcpdump', (error) => {
			if (error) {
				return rej(new Error('tcpdump не найден, убедитесь, что она установлена и доступна в PATH'));
			}
			res(true);
		});
	});
};
