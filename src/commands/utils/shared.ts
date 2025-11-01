/**
 * Randomly shuffles an array using Fisher-Yates algorithm
 */
export function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

/**
 * Groups players into games of Deadzone Rogue (max 3 per game)
 * Never suggests more than 1 singleplayer game
 */
export function groupPlayers(players: string[]): string[][] {
	if (players.length === 0) {
		return [];
	}

	const shuffled = shuffle(players);
	const groups: string[][] = [];
	let index = 0;

	// Process players to create groups
	while (index < shuffled.length) {
		const remaining = shuffled.length - index;

		// If we have exactly 4 remaining, randomly choose between 3+1 or 2+2
		if (remaining === 4) {
			const chooseThreePlusOne = Math.random() < 0.5;
			if (chooseThreePlusOne) {
				// Create 3+1
				groups.push([shuffled[index], shuffled[index + 1], shuffled[index + 2]]);
				index += 3;
			} else {
				// Create 2+2
				groups.push([shuffled[index], shuffled[index + 1]]);
				groups.push([shuffled[index + 2], shuffled[index + 3]]);
				index += 4;
			}
		}
		// If we have 5 or more remaining, create a group of 3
		else if (remaining >= 5) {
			groups.push([shuffled[index], shuffled[index + 1], shuffled[index + 2]]);
			index += 3;
		}
		// If we have exactly 3 remaining, create a group of 3
		else if (remaining === 3) {
			groups.push([shuffled[index], shuffled[index + 1], shuffled[index + 2]]);
			index += 3;
		}
		// If we have exactly 2 remaining, create a group of 2
		else if (remaining === 2) {
			groups.push([shuffled[index], shuffled[index + 1]]);
			index += 2;
		}
		// If we have exactly 1 remaining
		else if (remaining === 1) {
			// Check if we already have a singleplayer game
			const hasSinglePlayer = groups.some((group) => group.length === 1);

			if (hasSinglePlayer) {
				// Already have a singleplayer game, redistribute to avoid multiple singleplayer games
				// Take one player from the last group to make it 2/2
				if (groups.length > 0) {
					const lastGroup = groups[groups.length - 1];
					groups.pop();
					groups.push([lastGroup[0], shuffled[index]]);
					groups.push([lastGroup[1], lastGroup[2]]);
				} else {
					// This shouldn't happen, but handle it anyway
					groups.push([shuffled[index]]);
				}
			} else {
				// No singleplayer game yet, allow it (e.g., 4 players -> 3/1)
				groups.push([shuffled[index]]);
			}
			index += 1;
		}
	}

	return groups;
}

/**
 * Formats the groups into a readable message
 */
export function formatGroups(groups: string[][]): string {
	if (groups.length === 0) {
		return 'No players provided!';
	}

	const lines = groups.map((group, index) => {
		const playersList = group.join(', ');
		const gameNumber = String(index + 1);
		const playerCount = String(group.length);
		return `**Game ${gameNumber}:** ${playersList} (${playerCount} player${group.length === 1 ? '' : 's'})`;
	});

	return lines.join('\n');
}

/**
 * Parses players from input string, handling Discord mentions
 */
export function parsePlayers(playersInput: string): string[] {
	// Extract all Discord mentions from the input
	// Matches <@123456789> (user mentions) and <@!123456789> (nickname mentions)
	const mentionRegex = /<@!?\d+>/g;
	const mentions = playersInput.match(mentionRegex) ?? [];

	// If we found mentions, use them (each mention is a separate player)
	// Otherwise, fall back to parsing by comma or space
	let players: string[] = [];
	if (mentions.length > 0) {
		players = mentions;
	} else {
		// No mentions found, parse as text
		if (playersInput.includes(',')) {
			players = playersInput
				.split(',')
				.map((p) => p.trim())
				.filter((p) => p.length > 0);
		} else {
			// Split by whitespace
			players = playersInput
				.split(/\s+/)
				.map((p) => p.trim())
				.filter((p) => p.length > 0);
		}
	}

	return players;
}
