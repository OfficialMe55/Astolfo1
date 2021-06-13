module.exports = {
	name: 'event',
	description: 'event',
	async execute(msg, args) {
		const Discord = require('discord.js')
		
		let losowa = Math.floor(Math.random()*3+1)
		
// 1 - Kamienny Golem
// 2 - Feniks z Papieru
// 3 - Skrzacik "nożycołapek"

		switch(losowa){
			case 1:
				var enemy = 'Kamienny Golem'
				var image = 'https://i.redd.it/76ztct5p5iu51.png'
				break
			case 2:
				var enemy = 'Feniks z Papieru'
				var image = 'https://i.pinimg.com/originals/22/e1/1f/22e11fa6b4040564ccc01f58ffe9db2f.jpg'
				break
			case 3:
				var enemy = 'Skrzacik "nożycołapek"'
				var image = 'https://images-na.ssl-images-amazon.com/images/I/71y9wcbNREL._AC_SX679_.jpg'
				break
		}

		const Zdarzenie = new Discord.MessageEmbed()
			.setColor('#fea1af')
			.setTitle('Astolfo Zdarzenie!')
			.setDescription(`O nie! Zaatakował cię ${enemy}, jakim czarem chcesz się obronić? \n 1 - powiew papieru \n 2 - cios mistrza nożyczek \n 3 - zaklęcie przywołania: Wielki Głaz`)
			.setImage(image);
		msg.channel.send(Zdarzenie)
		
		const filter = m => (m.author.id == msg.author.id)
		const channel = msg.channel
		const collector = channel.createMessageCollector(filter, {maxProcessed: 2, time: 10000})
		
		collector.on('collect',  (m) => {
			var odp = m.content
			var wynik = losowa/odp
			switch (wynik){
				case 1:
					const Win = new Discord.MessageEmbed()
						.setColor('#fea1af')
						.setTitle('Zwycięstwo!')
						.setDescription(`Brawo! Pokonałeś potwora i zdobyłeś puchar!`)
						.setImage('https://media.istockphoto.com/vectors/pixel-art-golden-cup-award-trophy-icon-vector-id823725470?k=6&m=823725470&s=170667a&w=0&h=X-LFQyKTW0W1__rQhs5FEClCOHua7je8zZExXypYo9k=');			
					msg.channel.send(Win)
					return
				
				case (1/3):
				case 2:
				case 1.5:
					const Tie = new Discord.MessageEmbed()
						.setColor('#fea1af')
						.setTitle('Remis!')
						.setDescription(`Nie pokonałeś potwora, ale przynajmniej nie umarłeś ;b`)
						.setImage('https://external-preview.redd.it/i-Pa2o9-SM17y_7kB4h6B2sDA8oXVl2e3rH0BC6y100.jpg?auto=webp&s=0e4646c0fbd802c1618986c599e501d657efe9dc');			
					msg.channel.send(Tie)
					return
					
				case 0.5:
				case (2/3):
				case (3):
					const Loss = new Discord.MessageEmbed()
						.setColor('#fea1af')
						.setTitle('Przegrana!')
						.setDescription(`Potwór okazał się silniejszy...`)
						.setImage('https://i.pinimg.com/originals/24/83/9c/24839cf7282061ab44608e5e05bd0b71.jpg');			
					msg.channel.send(Loss)				
					return
			}
		})
		collector.on('end', collected =>{
			if(collected.size== 0){
				const wolny = new Discord.MessageEmbed()
					.setColor('#fea1af')
					.setTitle('Nie zdążyłeś')
					.setDescription('W czasie, gdy ty zastanawiałeś się nad czarem, twój przeciwnik zdążył powalić cię na łopatki! Następnym razem faktycznie użyj zaklęcia!')
					.setImage('https://media.istockphoto.com/vectors/hour-glass-sign-transparent-sandglass-icon-time-hourglass-sandclock-vector-id942707538')
				msg.channel.send(wolny)
				return
				}
		})
	}
}








