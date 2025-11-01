import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { formatGroups, groupPlayers, parsePlayers } from './utils/shared.ts';

export const command = {
	data: new SlashCommandBuilder()
		.setName('decide')
		.setDescription('Decide who should play in games of Deadzone Rogue')
		.addStringOption((option) =>
			option
				.setName('players')
				.setDescription('Mention or list the players (e.g., @user1 @user2 @user3)')
				.setRequired(true),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const playersInput = interaction.options.getString('players', true);
		const players = parsePlayers(playersInput);

		if (players.length === 0) {
			await interaction.reply({
				content: '❌ Please provide at least one player!',
				ephemeral: true,
			});
			return;
		}

		// Group players
		const groups = groupPlayers(players);

		// Format response
		const message = `🎮 **Deadzone Rogue Game Assignments**\n\n${formatGroups(groups)}`;

		await interaction.reply({
			content: message,
		});
	},
};
