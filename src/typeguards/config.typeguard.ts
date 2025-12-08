import { Config } from '../interfaces';

export const isConfig = (object: any): object is Config => {
	if (!('ports' in object) || !('timeout' in object) || typeof object.timeout !== 'number' || !Array.isArray(object.ports) || typeof object.ports[0] !== 'number') {
		return false;
	}
	return true;
}