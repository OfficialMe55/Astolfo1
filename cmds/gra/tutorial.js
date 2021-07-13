module.exports = {
	name: 'tutorial',
	description: 'tutorial',
	execute(msg, args) {		
	
		main(msg, args)
		
		async function main (msg, args){
			
			const Discord = require ('discord.js')
			
			const emoji = require ('./emoji.json')
			
			
			const tutorial = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Tutorial')
				.setDescription(`Astolfo Gra jest inspirowana grą "shakes and fidget". Twoim zadaniem jest ulepszanie postaci w wyprawach na **misje**, walkach z innymi graczami i na różnych **eventach**. \n System walki nie jest tak skomplikowany, na jaki może wyglądać: \n\n -Walki zawsze biorą forme pojedynku, tak więc 1v1. \n -Podczas swojej tury najczęściej masz dwie **akcje** do wykonania (wyjątkiem jest pierwsza tura zaczynającego gracza, podczas której może wykonać tylko jedną **akcję**). \n -Na początku walki otrzymujesz **esencję** ${emoji.sila} siły, ${emoji.obrona}obrony i ${emoji.magicka} magicki. Ich początkowa (i maksymalna) ilość jest równa twojej wartości **statystyki** \n -Esencja jest wymagana do korzystania z większości **zdolności**, np. zdolność o nazwie **cios**, która zamienia **esencję** ${emoji.sila} siły na obrażenia zadawane wrogowi \n\n I to wszystko z tych najważniejszych rzeczy! Aby kontynuować poradnik i przejść do walki wpisz dowolną wiadomość`)
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
			msg.channel.send (tutorial)
			
			var stats = await readSTATS(msg, args)
			if(stats == null) {
				msg.channel.send('Aby kontynuować musisz najpierw stworzyć postać: =gra register')
				return
			}
			
			const monster = {
				"id": 0,
				"name": "manekin",
				"url": "https://art.pixilart.com/4025ed819bd4032.gif",
				"sila": 2,
				"obrona": 5,
				"magicka": 2,
				"skills": {"1": "cios", "2": "obrona", "3": "magiczny_cios"}
			}
			var response = await readMSG(msg, args)
			if(response == null){
				msg.channel.send('Nie musiałeś się śpieszyć z czytaniem wiadomości, możesz wpisać "=gra tutorial" jeszcze raz')
				return
			}
			
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                                    TUTAJ INICJALIZACJA FUNKCJI WALKI
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
			const walka = require ('./walka/tutorial_walki.js')                               					    		 //
			let result = await walka.execute(msg, stats, monster)		 											 //
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                          WALKA ZWRACA TRUE, JEŚLI BOHATER ZWYCIĘŻYŁ, LUB FALSE, JEŚLI PRZEGRAŁ
//                                           ALE W PRAKTYCE KOD JEST GŁUPI I NIE OGARNIA, ŻE JAK MA AWAIT, TO MA CZEKAĆ
				console.log(result)
		}
		
		
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                                 FUNKCJA POBIERAJĄCA DANE GRACZA
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
		async function readSTATS (msg, args) {
			const fs = require ('fs')
			var data = fs.readFileSync(`./MEMORY/rejestr/${msg.author.id}.json`)
			var output = JSON.parse(data.toString())
			return (output)
		}
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                                   FUNKCJA CZYTAJĄCA WIADOMOŚCI
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
		async function readMSG (msg, args) {
				const filter = (m) => (m.author.id == msg.author.id)
			
				return msg.channel.awaitMessages(filter, {max: 1, time: 360000, errors: ['time']})
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