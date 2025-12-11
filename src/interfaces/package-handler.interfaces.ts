export interface PackageHandlerHistoryItem {
	fromIp: string;
	lastUpdate: number;
	isDangerous: boolean;
	ports: number[];
}
