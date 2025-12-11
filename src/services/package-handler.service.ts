import type { PackageHandlerHistoryItem } from '../interfaces/package-handler.interfaces.js';
import { extractDataFromTCPDumpChunk } from '../mappers/tcpdump.mapper.js';
import { Logger } from './log.service.js';

export class PackageHandler {
	private history: Map<string, PackageHandlerHistoryItem>;
	private requiredPorts: number[];

	constructor() {
		this.history = new Map();
		this.requiredPorts = process.env.PORTS?.split(',')?.map((p) => Number(p)) as number[];
	}

	async handle(buffer: Buffer): Promise<void> {
		const chunk: string = buffer.toString('utf-8');
		console.log(chunk);
		const data = extractDataFromTCPDumpChunk(chunk);
		if (!data) {
			return;
		}
		const historyItem = this.history.get(data.from);
		if (!historyItem) {
			this.history.set(data.from, {
				fromIp: data.from,
				isDangerous: false,
				lastUpdate: Date.now(),
				ports: [data.port]
			});
			return;
		}

		const newPortList = historyItem.ports.concat(data.port);
		const isHasAllRequiredPorts = this.hasAllRequiredPorts(newPortList);
		const newHistoryItem: PackageHandlerHistoryItem = {
			...historyItem,
			isDangerous: isHasAllRequiredPorts,
			lastUpdate: Date.now(),
			ports: newPortList
		};

		this.history.set(data.from, newHistoryItem);
	}

	checkHistoryForIntruders(): void {
		const values = this.history.values().toArray();
		for (const item of values) {
			if (!item.isDangerous) {
				continue;
			}
			Logger.logIntruder(item);
		}
		this.history.clear();
	}

	private hasAllRequiredPorts(ports: number[]): boolean {
		const setPorts = new Set(ports);
		return this.requiredPorts.every((p) => setPorts.has(p));
	}
}
