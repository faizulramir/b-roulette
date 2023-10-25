require('dotenv').config()
const { REST, Routes } = require('discord.js');

const rest = new REST().setToken(process.env.TOKEN);

rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, '1165929350709907536'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);