module.exports = {
	name: 'Profil',
	description: 'Pokazuje profil twojego bohatera',
	type: 'bohater',
	execute(msg, args) {
		
		const Discord = require ('discord.js')
		const fs = require('fs')
		
		msgSplit = msg.content.split(' ')
		if (msgSplit[2] == undefined){
			var id = msg.author.id
		} else {
			var id = msg.mentions.users.first().id
		}
		
		
		fs.readFile(`./MEMORY/rejestr/${id}.json`,  'utf8', (err, data) => {
			try {
				const content = JSON.parse(data)
				
				const profil = new Discord.MessageEmbed()
					.setColor('#fea1af')
					.setDescription(`Oto postać <@${id}> \n\n ${content.klasa} lvl: ${content.lvl} \n\n Statystyki: \n Siła: ${content.sila} \n Obrona: ${content.obrona} \n Magicka: ${content.magicka}`)
					.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
				msg.channel.send(profil)
			
			} catch(err){
				msg.channel.send('Ty, lub osoba, którą pingowałeś, nie ma stworzonej postaci. Aby stworzyć postać wpisz "=gra register"')
			}
		})
	}
}