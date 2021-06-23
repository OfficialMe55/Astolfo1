module.exports = {
	name: 'memory',
	description: 'memory',
	execute(msg, args) {
		
		const Discord = require ('discord.js')
		var fs = require('fs')
		
		let msgSplit = msg.content.split(' ')
		
		if(msg.content == 'memory'){
		
					const poradnik = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setDescription('Żebym coś zapamiętał musisz mi napisać co dokładnie :stuck_out_tongue_winking_eye: \n Napisz memory save X, a ja zapamiętam X \n Napisz memory load, a ja odpiszę ostatnią zapamiętaną wiadomość')
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
				
				msg.channel.send(poradnik)
				return
		}

		switch(msgSplit[1]){
			case 'save':
				var napis = msgSplit[2]
				for(i = 3; i < msgSplit.length; i++){
					napis = napis + ' ' + msgSplit[i]
				}
				const obiekt = {
					"name": "Pamięć",
					"value": napis
				}
				
				fs.writeFile('./MEMORY/memory.json', JSON.stringify(obiekt), err => {if(err) console.log(err)})
					
					if (!msgSplit[2] == '') msg.channel.send('Oki Doki! Zapamiętam to :heart:')
					else msg.channel.send ('właśnie dostałem przez ciebię amnezji... wielkie dzięki... baka!')
					
			break
			
			case 'load':
			
				fs.readFile('./MEMORY/memory.json',  'utf8', (err, data) => {
					try {
						const content = JSON.parse(data)
						
						if(!content.value == '') msg.channel.send(content.value)
						else msg.channel.send('niczego nie pamiętam, daj mi coś do zapamiętania :pleading_face:')
					
					} catch(err){
						console.log(err)
					}
				})
			break
		}
		return
	}
}