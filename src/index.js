const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  }
]; 

const rest = new REST({ version: '9' }).setToken(TOKEN);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// SLASH COMMANDS DEFINITION
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('message', message => {
  if (message.content === '!help') {
    message.channel.send("AJUDA");
  }
});

client.login(TOKEN);