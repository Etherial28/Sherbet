const { prefix, developerID } = require("./config.json")
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS" ]})

const keepAlive = require("./server")

const Database = require("@replit/database")
const db = new Database()

client.options.http.api = "https://discord.com/api"

//Welcome Message

const welcome = require("./welcome")
welcome(client)

//Login Message on Console

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//Ping

client.on("messageCreate", msg => {
  if (msg.content === `=ping`) {
    msg.reply(`Pong! Your ping is ${client.ws.ping}ms`)
  }
})

keepAlive() //Keep up server

const setCommands = require("./setCommands")
setCommands() //Initiates command builder

//Start of slash commands

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '330165085932879872';
const guildId = '996376114215796777';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

//End of slash commands

client.login(process.env.TOKEN).catch(console.error) //Login Token