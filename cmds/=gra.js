module.exports = {
	name: '=gra',
	description: '=gra',
	execute(msg, args) {
		const Discord = require('discord.js')
		const client = new Discord.Client()
		const fs = require('fs')
		client.commands = new Discord.Collection()
		
		let msgSplit = msg.content.split(' ')
		
		const commandFiles = fs.readdirSync('./cmds/gra').filter(file => file.endsWith('.js'))
		for (const file of commandFiles){
			const command = require(`./gra/${file}`)
			client.commands.set(command.name, command)
		}
		
		
		if (msgSplit[1] == null || msgSplit[1] == 'help'){
			msg.channel.send('help')
			return
		} else {
			var komenda = msgSplit[1].toLowerCase()
		}

		if (!client.commands.has(komenda)) return;
		
		try{
			client.commands.get(komenda).execute(msg, args)
		} catch(error){
			console.log(error)
		}
/*		client.commands = new Discord.Collection();
		
		const commandFiles = fs.readdirSync('./gra').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./gra/${file}`);
			client.commands.set(command.name, command);
		}
		
		let msgSplit = msg.content.split(' ')
		
		if (!msgSplit[1] == null) {
			const command = msgSplit[1].toLowerCase()
		}
		
		if (!client.commands.has(command)) return;

		try {
			client.commands.get(command).execute(message, args);
		} catch (error) {
			console.error(error);
		} */
	}
}