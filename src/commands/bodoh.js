const { SlashCommandBuilder, userMention } = require('discord.js');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bodoh')
		.setDescription('Siapa bodoh!'),
	async execute(interaction) {
		await interaction.guild.members.fetch();
		const channel = await interaction.member.guild.channels.fetch("945259898860617758");
		const members = channel.members.map(member => member.id);

		if (members.length > 0) {
			var randomWord = ['eh', 'hehe', 'hihi'];
			var replyTo = members[Math.floor(Math.random()*members.length)];
			var randomWordReply = randomWord[Math.floor(Math.random()*randomWord.length)];
			interaction.reply(randomWordReply + ' ' + userMention(replyTo) + ' bodoh');
		} else {
			interaction.reply('Takde orang lagi');
		}
	},
};