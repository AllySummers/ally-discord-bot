import type { Command } from './types.ts';

const getCmd = <T extends { command: Command }>(module: Promise<T>) =>
	module.then((m) => m.command);

export const loadCommands = (): Promise<Command[]> =>
	Promise.all([getCmd(import('./decide.ts')), getCmd(import('./stop-being-a-bottom.ts'))]);
