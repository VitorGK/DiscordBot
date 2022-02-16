const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Create a reaction role for a message.')
        .addStringOption(opt => 
            opt
                .setName('message_link')
                .setDescription('The message link')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.memberPermissions.has(Discord.Permissions.STAGE_MODERATOR)) {
            await interaction.reply({
                content: 'You need to be an adminstrator to use that command!',
                ephemeral: true
            });
        } else {
            let messageLink = interaction.options.getString('message_link', true);
            let splittedLink = messageLink.split('/');
            let guildId = splittedLink.at(-3);
            let channelId = splittedLink.at(-2);
            let messageId = splittedLink.at(-1);

            let guild = interaction.client.guilds.cache.get(guildId);
            let channel = guild.channels.cache.find(c => c.id === channelId);

            await channel.messages.fetch(messageId).then(message => {
                message.react('😂');
            }).catch(console.error);
        }
    }
};