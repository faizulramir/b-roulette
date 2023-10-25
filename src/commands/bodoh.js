const { SlashCommandBuilder, userMention } = require('discord.js');
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bodoh')
		.setDescription('Siapa bodoh?'),
	async execute(interaction) {
		await interaction.deferReply()
		const members = await getData(interaction)
		if (members.length === 0) {
			await interaction.editReply('Masukle channel dulu')
		}

		members.forEach(m => {
			m.members.forEach(async ms => {
				if (ms === interaction.user.id)  {
					var randomWord = ['eh', 'hehe', 'hihi'];
					var replyTo = m.members[Math.floor(Math.random()*m.members.length)];
					var randomWordReply = randomWord[Math.floor(Math.random()*randomWord.length)];
					await interaction.editReply(randomWordReply + ' ' + userMention(replyTo) + ' bodoh')
				}
			});
		});
	},
};

async function getData(interaction) {
	const channels = await interaction.member.guild.channels.fetch()
	let allMemberInChannel = []
	channels.forEach(async element => {
		const channel = await interaction.member.guild.channels.fetch(element.id.toString());
		if (channel.type === 2) {
			if (channel.members !== undefined) {
				let membersID = []
				channel.members.forEach(e => {
					membersID.push(e.id)
				});

				if (membersID.length > 0)  {
					allMemberInChannel.push({
						channel: element.id,
						members: membersID
					})
				}
			}
		}
	});

	return allMemberInChannel
}