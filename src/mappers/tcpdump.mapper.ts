import type { TCPDumpData } from '../interfaces/tcpdump.interface.js';

// IP 192.168.255.26.54216 > 87.240.190.70.443: tcp 0
export const extractDataFromTCPDumpChunk = (chunk: string): TCPDumpData | null => {
	if (!chunk || !chunk.startsWith('IP')) {
		return null;
	}
	const regex = /IP\s+([\d.]+)\.(\d+)\s+>\s+([\d.]+)\.(\d+)(?::\s*[a-zA-Z]+\s+)?(\d+)/;
	const match = chunk.match(regex);
	if (!match) {
		console.error(`Неверный формат строки: ${chunk}`);
		return null;
	}
	return {
		from: `${match[1]}`,
		to: `${match[3]}:${match[4]}`,
		port: Number(match[4]),
		lengthPacket: Number(match[5])
	};
};
