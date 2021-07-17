module.exports = {
	name: 'delete',
	description: 'Nieodwracalnie usuwa twojego bohatera.',
	type: 'bohater',
	execute(msg, args) {
		
		
		main (msg, args)
		
		async function main (msg, args){
			const Discord = require ('discord.js')
			const fs = require('fs')
			fs.readFile(`./MEMORY/rejestr/${msg.author.id}.json`,  'utf8', async (err, data) => {
				try {
					const random = Math.floor(Math.random()*1000)
					msg.channel.send(`Na pewno chcesz usunąć swoją postać? \n Napisz **cancel**, żeby anulować \n napisz: **${random}**, aby usunąć`)
					while(1){
						response = await readMSG(msg)
						if(response == random) {
							fs.unlinkSync(`./MEMORY/rejestr/${msg.author.id}.json`, (err) => {
								if (err){
									console.log(err)
									return
								}
							})
							msg.channel.send('Pomyslnie usunięto postać')
							return
						}
						else if(response.toLowerCase() == 'cancel' || response == null){
							msg.channel.send('Anulowano usuwanie')
							return
						} 
					}
					
				
				} catch(err){
					cmsg.channel.send('Nie masz postaci, którą mógłbyś usunąć')
				}
			})
		}
		
		
		async function readMSG (msg){
			const filter = (m) => (m.author.id == msg.author.id)
		
			return msg.channel.awaitMessages(filter, {max: 1, time: 90000, errors: ['time']})
				.then((collected) => {
					message = collected.first()
					message.delete({ timeout: 10}) // CZĘŚĆ ODPOWIEDZIALNA ZA USUWANIE
					return message.content
				})
				.catch((collected) => {
					return null
				})
		}
	}
}