const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		if (!interaction.memberPermissions.has(Discord.Permissions.STAGE_MODERATOR)) {
			await interaction.reply({
				content: 'You need to be an administrator to use that command!',
				ephemeral: true
			});
		} else {
			let ping = interaction.client.ws.ping;

			let embed1 = new Discord.MessageEmbed()
				.setColor('YELLOW')
				.setDescription('Calculating ping...');
	
			let embed2 = new Discord.MessageEmbed()
				.setColor('GREEN')
				.setDescription(`Pong! (${ping} ms)`);
	
			await interaction.reply({
				embeds: [embed1],
				fetchReply: true
			}).then(message => {
				setTimeout( () => {
					message.edit({
						embeds: [embed2]
					});
				}, 1000);
			}).catch(console.error);
		}
	}
};
