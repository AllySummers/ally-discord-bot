import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { loadCommands } from './commands/index.ts';
import type { Command } from './commands/types.ts';
import { getEnv } from './env.ts';

// Extend Client to include commands property
declare module 'discord.js' {
	interface Client {
		commands: Collection<string, Command>;
	}
}

const env = getEnv();
const rest = new REST().setToken(env.DISCORD_TOKEN);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Store commands in a Collection (Discord.js pattern)
client.commands = new Collection<string, Command>();

// Load commands and populate the collection
const commands = await loadCommands();
for (const command of commands) {
	client.commands.set(command.data.name, command);
}

// Register commands on Discord
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	void (async () => {
		try {
			const commandCount = String(commands.length);
			console.log(`Started refreshing ${commandCount} application (/) command(s).`);

			const commandData = commands.map((command) => command.data.toJSON());

			const data = await rest.put(Routes.applicationGuildCommands(env.APP_ID, env.GUILD_ID), {
				body: commandData,
			});

			const reloadedCount = String((data as unknown[]).length);
			console.log(`Successfully reloaded ${reloadedCount} application (/) command(s).`);
		} catch (error) {
			console.error('Error registering commands:', error);
		}
	})();
});

// Handle command interactions
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error('Error executing command:', error);
		const errorMessage = 'There was an error while executing this command!';
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: errorMessage, ephemeral: true });
		} else {
			await interaction.reply({ content: errorMessage, ephemeral: true });
		}
	}
});

void client.login(env.DISCORD_TOKEN);
