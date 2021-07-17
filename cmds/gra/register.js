module.exports = {
	name: 'register',
	description: 'Otwiera kreator postaci do Astolfo gry.',
	type: 'start',
	execute(msg, args) {
		
		const fs = require('fs')
		const Discord = require ('discord.js')
		const client = new Discord.Client()
		const autor = msg.author.id
		const emoji = require ('./emoji.json')
		
		const path = `./MEMORY/rejestr/${autor}.json`

		fs.access(path, fs.F_OK, (err) => {
			if (err) {
				main(msg, args)
				return
			}
			msg.channel.send('Jesteś już zarejestrowany. Napisz **=gra**, lub **=gra help** po wskazówki')
		})
		
		
		async function main(msg, args){
			
			const Start = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Rejestracja')
				.setDescription('Wybierz klasę: \n\n 1. barbarzyńca - klasa opierająca się głównie na zadawaniu obrażeń \n 2. rycerz - Potężny obrońca opierający się na swoim pancerzu i niezwykłej kondycji \n 3. mag - mimo swojej wrażliwości ma wielki potencjał w zadawaniu obrażeń')
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
			msg.channel.send(Start)
			
			var klasa = null
			while (klasa == null){
				message = await readMSG(msg, args)
				messagesplit = message.split(' ')
				
				switch(messagesplit[0].toLowerCase()){
					case null:
						msg.channel.send('Błąd - przekroczono czas oczekiwania, rejestracja anulowana')
						return
					
					case '1':
						var klasa = 1
						var sklasa = 'barbarzyńca'
						var sila = 4
						var obrona = 3
						var magicka = 3
						break 
					
					case '2':
						var klasa = 2
						var sklasa = 'rycerz'
						var sila = 3
						var obrona = 4
						var magicka = 3
						break
					
					case '3':
						var klasa = 3
						var sklasa = 'mag'
						var sila = 3
						var obrona = 3
						var magicka = 4
						break
						
					case'=gra':
						return
						
					default:
						msg.channel.send('Wybrano nieprawidłową klasę, spróbuj jeszcze raz')
						break
				}
			}

			const punkty = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Rejestracja')
				.setDescription(`Teraz czas na rozdanie punktów umiejętności! jako ${sklasa} zyskujesz następujące statystyki: \n\n ${emoji.sila} Siła = ${sila} \n ${emoji.obrona} Obrona = ${obrona} \n ${emoji.magicka} Magicka = ${magicka} \n \n Aby rozdać swoje **dwa różne** podaj pierwsze litery statystyk, które chcesz ulepszyć (np. so, żeby ulepszyć siłę i obronę)`)
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
			msg.channel.send (punkty)
			
			while (1){
				si = 0
				oi = 0
				mi = 0
				var message = await readMSG(msg, args)
				let msgsplit = message.split('')
				for (i = 0; i < 2; i++){
					switch (msgsplit[i]){
						
						case 's':
						case 'S':
							si = si+1
							break
							
						case 'o':
						case 'O':
							oi = oi+1
							break
							
						case 'm':
						case 'M':
							mi = mi+1
							break
							
						case '=':
							return
							
						default:
							msg.channel.send('błąd: upewnij się, że wpisałeś odpowiednie litery')
							si = 0
							oi = 0
							mi = 0
					}
				}
				if(si == 2 || oi == 2 || mi == 2) {
					msg.channel.send ('byłeś chciwy i chciałeś ulepszyć jedna statystykę dwa razy, tak nie wolno >.< \n spróbuj jeszcze raz')
				}
				if(si + oi + mi == 2) {
					var sila = sila + si
					var obrona = obrona + oi
					var magicka = magicka + mi
					break
				}
			}
			let koniec = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Rejestracja')
				.setDescription(`Oto twoja postać: \n\n ${sklasa} lvl 1 \n ${emoji.sila} sila: ${sila} \n ${emoji.obrona} obrona: ${obrona} \n ${emoji.magicka} magicka: ${magicka} \n\n Czy chcesz zapisać tą postać? (T/N)`)
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
			msg.channel.send(koniec)
			
			var message = await readMSG(msg, args)
			let split = message.split(' ')
			while(1){
				switch(split[0].toLowerCase()){
					case 'y':
					case 'yes':
					case 't':
					case 'tak':
					
					const obiekt = { "ID": autor, "klasa": sklasa, "lvl": 1, "sila": sila, "obrona": obrona, "magicka": magicka, "skills": {"1": "cios", "2": "obrona", "3": "magiczny_cios", "4": null, "5": null} }
					
						fs.open(path, 'w', function (err, file){
							if (err) throw err
							msg.channel.send('Twoja postać została zapisana!')
						})
						fs.writeFile(path, JSON.stringify(obiekt, null, 2), err => {if(err) console.log(err)})
					return
				
					case 'n':
					case 'no':
					case 'nie':
						msg.channel.send('Tworzenie postaci anulowane')
						return
				}
			}
		}
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                                   FUNKCJA CZYTAJĄCA WIADOMOŚCI
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
		async function readMSG (msg, args) {
				const filter = (m) => (m.author.id == msg.author.id)
			
				return msg.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
					.then((collected) => {
						message = collected.first().content
						return message
					})
					.catch((collected) => {
						return null
					})
		}
	}
}