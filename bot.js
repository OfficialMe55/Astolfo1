console.log('Starting');
require("dotenv").config();

// BIBLIOTEKI
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
var fs = require('fs');

//INNE
const config = require('./config.json');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	client.commands.set(command.name, command);
}


//login do discorda
client.login(process.env.BOTTOKEN);
client.on('ready', readyDiscord);

//funkcja po odpaleniu bota
function readyDiscord() {
	console.log ('Astolfo');
}


//funkcja po wpisaniu dowolnej wiadomości
client.on('message', async (msg) => {
	
	
	if(msg.author.bot ) return
	
	const currentDate = new Date();
	console.log(currentDate.toLocaleString());	
	
	

	//komenda pingująca Natana za każdym razem, gdy ktoś wspomni o grzybie
	if(msg.content.toLowerCase().includes('grzyb'.toLowerCase()) && msg.guild.id == '455086148105142329'){
		msg.channel.send('<@368404318342217738>');
	}
	
	//komenda pingująca Dominika za każdym razem, gdy ktoś wspomni o pomidorze
	if(msg.content.toLowerCase().includes('pomidor'.toLowerCase()) || msg.content.toLowerCase().includes('groch'.toLowerCase()) || msg.content.toLowerCase().includes('grosz'.toLowerCase())  && msg.guild.id == '455086148105142329'){
		msg.channel.send('<@324945476824727553> Pomidorze chodź');
	}
	
	if(msg.content.toLowerCase().includes('tele'.toLowerCase()) && msg.guild.id == '455086148105142329'){
	msg.channel.send('<@275658656727695364>');
} 

//	if(msg.content == 'astolfo'){
//	}
	
	let msgSplit = msg.content.split(' ');
	const command = msgSplit[0].toLowerCase();
	
if (!client.commands.has(command)) return;

const args = msg.content.trim();


	try{
		client.commands.get(command).execute(msg, args);
	} catch (error) {
		console.log(error);
	};
	
});