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
			
			var start = ''
			var inne = ''
			var miasto = ''
			var bohater = ''
			var text = ''
			client.commands.forEach( element => {
				switch (element.type){
					case 'start':
						start += `**${element.name}**:  ${element.description} \n`
						break
					
					case 'miasto':
						miasto += `**${element.name}**:  ${element.description} \n`
						break
						
					case 'bohater':
						bohater += `**${element.name}**:  ${element.description} \n`
						break
						
					default:
						inne += `**${element.name}**:  ${element.description} \n`
				}
			})
			
			const help = new Discord.MessageEmbed()
					.setColor('#fea1af')
					.setTitle('Lista Komend ')
					.setDescription(`Prefix: =gra \n ====================Miasto===================== \n ${miasto} \n ====================Postać===================== \n ${bohater} \n =================Dla Nowych================= \n ${start} \n =====================Inne===================== \n ${inne}`)
					.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
				msg.channel.send(help)
			
			
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