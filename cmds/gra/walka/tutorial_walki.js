module.exports = {
	async execute (msg, stats, monster){
		
		const Discord = require ('discord.js')
		const emoji = require('../emoji.json')
		
		output = await main (msg, stats, monster)
		return output
		
// https://stackoverflow.com/questions/52888706/how-to-change-multiple-variables-for-any-given-variable-inside-a-function
		
		
/*
Wyjaśnienia co do zmiennych:
	1. Zmienne stats (np. stats.sila) odnoszą się WYŁĄCZNIE do statystyk początkowych (maksymalnych)
	2. zmienne emoji (np. emoji.sila) odnoszą się WYŁĄCZNIE do emotek z pliku emoji.json, nie wykonuje się na nich żadnych kalkulacji nie licząc wyświetlania emotek
	3. zmienne e (np. esila) są ciągami emotek stosowanymi do wizualizacji ciągów emotek
	4. zmienne zwykłe (np. sila) są to zmienne aktualnej ilości danej wartości (np. ilość esencji siły), ich wartość jest zmienna, ale nie może przekraczać stats.
	5. zmienne enemyStats (np. enemyStats.sila) są to zmienne dotycząc wroga (np. siła wroga)
*/

		
		async function main (msg, stats, monster, lvl){
			if (lvl == null) lvl = 1
			
			
///////////////////////////////////////////////////////////////
//								   INICJALIZACJA STATYSTYK WROGA
			enemyStats = {"sila": monster.sila, "obrona": monster.obrona, "magicka": monster.magicka}
			enemyStats.sila += lvl-1
			enemyStats.obrona += lvl-1
			enemyStats.magicka += lvl-1
			
			
			
///////////////////////////////////////////////////////////////
//											INICJALIZACJA HP WROGA
			enemyHP = monster.obrona+monster.bonusHP       // Manekin dostaje bonus zdrowia +2
			enemyTarcza = 0
			eEnemyHP = ''
			for(i = 0; i < monster.obrona + monster.bonusHP; i++){
				eEnemyHP += `${emoji.hp1}`
			}
			enemyTarcza = 0
			
///////////////////////////////////////////////////////////////
//											INICJALIZACJA HP BOHATERA
			heroHP = stats.obrona
			heroTarcza = 0
			eHeroHP = ''
			for(i = 0; i < stats.obrona; i++){
				eHeroHP += `${emoji.hp1}`
			}
			heroTarcza = 0
			
///////////////////////////////////////////////////////////////
//					     RZUT MONETĄ I WIADOMOŚĆ STARTOWA
			moneta = Math.floor(Math.random()*2) 			//tutaj wychodzi albo 0 albo 1
			moneta = 1
			if(moneta == 0){
				text = `${msg.author} rozpoczyna walkę! \n Twoja kolej!`
				enemyTurn = false
			} else {
				text = `${monster.name} rozpoczyna walkę! \n Napisz cokolwiek, aby kontynuować`
				enemyTurn = true
			}
			
///////////////////////////////////////////////////////////////
//										INICJALIZACJA ESENCJI SIŁY
			sila = stats.sila
			esila = ''
			for(i = 0; i < sila; i++){
				esila += `${emoji.sila}`
			}
			
///////////////////////////////////////////////////////////////
//							      	INICJALIZACJA ESENCJI OBRONY			
			
			obrona = stats.obrona
			eobrona = ''
			for(i = 0; i < stats.obrona; i++){
				eobrona += `${emoji.obrona}`
			}

///////////////////////////////////////////////////////////////
//							      INICJALIZACJA ESENCJI MAGICKI		
			
			magicka = stats.magicka
			emagicka = ''
			for(i = 0; i < magicka; i++){
				emagicka += `${emoji.magicka}`
			}

///////////////////////////////////////////////////////////////
//							            INICJALIZACJA ZDOLNOŚCI	

			if(stats.skills[1] != null) skill1 = require(`./skills/${stats.skills[1]}`)
			else skill1 = {"name": "puste miejsce", "opis": "Puste miejsce na zdolność"}

			if(stats.skills[2] != null)  skill2 = require(`./skills/${stats.skills[2]}`)
			else skill2 = {"name": "puste miejsce", "opis": "Puste miejsce na zdolność"}
		
			if(stats.skills[3] != null)  skill3 = require(`./skills/${stats.skills[3]}`)
			else skill3 = {"name": "puste miejsce", "opis": "Puste miejsce na zdolność"}
		
			if(stats.skills[4] != null)  skill4 = require(`./skills/${stats.skills[4]}`)
			else skill4 = {"name": "puste miejsce", "opis": "Puste miejsce na zdolność"}
		
			if(stats.skills[5] != null)  skill5 = require(`./skills/${stats.skills[5]}`)
			else skill5 = {"name": "puste miejsce", "opis": "Puste miejsce na zdolność"}

			 tura = 1
		
			 walka = new Discord.MessageEmbed()
				.setTitle(`Walka z: ${monster.name}!          Tura: ${tura}`)
				.setDescription(`HP wroga: ${eEnemyHP} \n HP bohatera: ${eHeroHP} \n..........................................................................................................................\n ${text}\n .......................................................................................................................... \n Esencje: \n ${esila} Max: ${stats.sila}\n ${eobrona} Max: ${stats.obrona}\n ${emagicka} Max: ${stats.magicka}\n ..........................................................................................................................\n Zdolności:`)
				.setColor('#fea1af')
				.setThumbnail(`${monster.url}`)
				.setFooter('Nie śpiesz się, ale pamiętaj, masz dwie minuty na reakcję!')
				.addFields(
					{ name: `1. ${skill1.name}`, value: `${skill1.opis}`, inline: true},
					{ name: `2. ${skill2.name}`, value: `${skill2.opis}`, inline: true},
					{ name: `3. ${skill3.name}`, value: `${skill3.opis}`, inline: true},
					{ name: `4. ${skill4.name}`, value: `${skill4.opis}`, inline: true},
					{ name: `5. ${skill5.name}`, value: `${skill5.opis}`, inline: true},
					{ name: 'Z. Drugi Wdech', value: 'Odzyskaj x0.5 wartości wszystkich esencji', inline: true}
				)
			let sent1 = await msg.channel.send(walka)
			
			msg.channel.send('Tak wygląda interfejs walki, widać na nim od góry: \n -Zdrowie twoje i przeciwnika \n -"Terminal walki" opisujący co tak właściwie w danej chwili sie dzieje \n -**Twoja** esencja, którą możesz wydawać na zdolności \n -Zdolności, z których możesz korzystać podczas walki')
			if(enemyTurn == true ){
				
				// OCZEKIWANIE NA REAKCJĘ (potrzeba zrobić const filter)
				
				await readEMOJI(msg, sent1)
				
				
				
				 choice = await AI (msg, monster, enemyHP, enemyTarcza,  enemyStats, heroHP, heroTarcza) 
				 
				 
					//AI ZWRACA NAZWĘ ZDOLNOŚCI, KTÓREGO CHCE UŻYĆ, LUB 'Z', KIEDY CHCE UŻYĆ DEUGIEGO WDECHU
					if(choice == 'Z'){
						enemyStats.sila = await Z (enemyStats.sila, monster.sila)
						enemyStats.obrona = await Z (enemyStats.obrona, monster.obrona)
						enemyStats.magicka = await Z (enemyStats.magicka, monster.magicka)
						 text = `${monster.name} zażywa **drugi wdech**`
					} else {
						
						 skill = require (`./skills/${choice}`)
						 result = await skill.execute (enemyStats.sila, enemyStats.obrona, enemyStats.magicka)
						 
						if(result.obr != null){
							heroTarcza -=  result.obr
							if(heroTarcza < 0){
								heroHP += heroTarcza
								heroTarcza = 0
							}
						}
						if(result.tarcza != null){
							enemyTarcza += result.tarcza
						}
						 text = monster.name + result.text
						
						if(result.sila != null) enemyStats.sila = result.sila
						if(result.obrona != null) enemyStats.obrona = result.obrona
						if(result.magicka != null) enemyStats.magicka = result.magicka
					}
				enemyTurn = false
			} else {
				i = true
				while (result == null){
					 choice = await readMSG (msg, sent1)
					  if(choice != null)msgSplit = choice.split(' ')
					  else msgSplit[0] = null
					switch(msgSplit[0]){
						case '1':
							if(skill1 != null) result = await skill1.execute(sila, obrona, magicka)
							break
						
						case '2':
							if(skill2 != null) result = await skill2.execute(sila, obrona, magicka)
							break
							
						case '3':
							if(skill3 != null) result = await skill3.execute(sila, obrona, magicka)
							break
							
						case '4':
							if(skill4 != null) result = await skill4.execute(sila, obrona, magicka)
							break
							
						case '5':
							if(skill5 != null) result = await skill5.execute(sila, obrona, magicka)
							break
						
						case '=gra':
							msg.channel.send('użyto komendy podczas walki. Walka zakończona porażką')
							return false
						
						case null:
						case 'z':
						case 'Z':
							sila = await Z (sila, stats.sila)
							obrona = await Z (obrona, stats.obrona)
							magicka = await Z (magicka, stats.magicka)
							result = {"text": ' zażywa drugiego wdechu'}
							break
					
						default:
							msg.channel.send('wybierz znak odpowiadający zdolności, której chcesz użyć')
					}
				}
				if(result.obr != null){
							enemyTarcza -=  result.obr
							if(heroTarcza < 0){
								enemyHP += enemyTarcza
								enemyTarcza = 0
							}
						}
						if(result.tarcza != null){
							heroTarcza += result.tarcza
						}
						 text = `${msg.author}` + result.text
						
						if(result.sila != null) sila = result.sila
						if(result.obrona != null) obrona = result.obrona
						if(result.magicka != null) magicka = result.magicka
						
					enemyTurn = true
			}
			sent1.delete({timeout: 1})
			
///////////////////////////////////////////////////////////////
//							      ROZPOCZECIE WALKI TUROWEJ
				
				tutorial = 0
				while (heroHP > 0 && enemyHP > 0){
					tura++
					for(L = 0; L < 2; L++){
	//									AKTUALIZACJA ESENCJI SIŁY
						esila = ''
						for(i = 0; i < sila; i++){
							esila += `${emoji.sila}`
						}
				
	//							     	AKTUALIZACJA ESENCJI OBRONY	
						eobrona = ''
						for(i = 0; i < obrona; i++){
							eobrona += `${emoji.obrona}`
						}

	//							     AKTUALIZACJA ESENCJI MAGICKI		
						emagicka = ''
						for(i = 0; i < magicka; i++){
							emagicka += `${emoji.magicka}`
						}			

	//											AKTUALIZACJA HP WROGA
						eEnemyHP = ''
						for(i = 0; i < enemyHP; i++){
							eEnemyHP += `${emoji.hp1}`
						}
						for(i = 0; i < (monster.obrona - enemyHP+monster.bonusHP); i++){
							eEnemyHP += `${emoji.hp0}`
						}
						for(i = 0; i < enemyTarcza; i++){
							eEnemyHP += `${emoji.tarcza}`
						}
		
	//											AKTUALIZACJA HP BOHATERA
						eHeroHP = ''
						for(i = 0; i < heroHP; i++){
							eHeroHP += `${emoji.hp1}`
						}
						for(i = 0; i < (stats.obrona - heroHP); i++){
							eHeroHP += `${emoji.hp0}`
						}
						for(i = 0; i < heroTarcza; i++){
							eHeroHP += `${emoji.tarcza}`
						}
					if(enemyTurn == true) text += '\n Napisz cokolwiek, aby kontynuować'
					else text += '\n Twoja kolej! Wybierz zdolność!'
					
						 walka = new Discord.MessageEmbed()
							.setTitle(`Walka z: ${monster.name}!          Tura: ${tura}`)
							.setDescription(`HP wroga: ${eEnemyHP} \n HP bohatera: ${eHeroHP} \n..........................................................................................................................\n ${text}\n .......................................................................................................................... \n Esencje: \n ${esila} Max: ${stats.sila}\n ${eobrona} Max: ${stats.obrona}\n ${emagicka} Max: ${stats.magicka}\n ..........................................................................................................................\n Zdolności:`)
							.setColor('#fea1af')
							.setThumbnail(`${monster.url}`)
							.setFooter('Nie śpiesz się, ale pamiętaj, masz dwie minuty na reakcję!')
							.addFields(
								{ name: `1. ${skill1.name}`, value: `${skill1.opis}`, inline: true},
								{ name: `2. ${skill2.name}`, value: `${skill2.opis}`, inline: true},
								{ name: `3. ${skill3.name}`, value: `${skill3.opis}`, inline: true},
								{ name: `4. ${skill4.name}`, value: `${skill4.opis}`, inline: true},
								{ name: `5. ${skill5.name}`, value: `${skill5.opis}`, inline: true},
								{ name: 'Z. Drugi Wdech', value: 'Odzyskaj x0.5 wartości wszystkich esencji', inline: true}
							)
						let sent2 = await msg.channel.send(walka)
						
						switch (tutorial){
							case 0:
								msg.channel.send ('Możesz wybrać zdolności wpisując odpowiedni znak (np. **1** dla ciosu, lub **z** dla drugiego wdechu). Pamiętaj, że **wszystkie** ułamki zaokrąglane są w dół \n Manekin czeka na twój ruch ;3')
								tutorial++
								break
								
							case 1:
								msg.channel.send ('Umiejętność obrony pozwala zamienić tobie (i przeciwnikowi) esencję obrony w tarczę. Każdy punkt tarczy neguje jeden punkt obrażeń. Możesz o nich myśleć jako o "niebieskich sercach" w Isaacu')
								tutorial++
								break
							
							case 2:
								msg.channel.send ('Pamiętaj, że jeśli brakuje ci esencji, możesz użyć ostatniegu wdechu, żeby odnowić **każdy** rodzaj esencji. Drugi wdech jest jedyną zdolnością, której nie będzie można zamienić \n Oh, zapomniałem wspomnieć - nigdy nie możesz mieć więcej esencji, niż ci na to pozwala twoja statystyka')
								tutorial++
								break
							
							case 3:
								msg.channel.send('Pamiętaj, że twój przeciwnik również ma swoje statystyki... Może nie powinienem ci tego mówić, ale manekin ma 2 siły, 3 obrony i 2 magicki... \n W przyszłości może poznasz zdolności ujawniające statystyki twojego wroga ;3')
								tutorial ++
								break
							
							case 4:
								msg.channel.send('Jeśli przez dwie minuty nie wykonasz żadnej akcji, to twoja postać automatycznie użyje zdolności **drugi wdech**... w końcu to ma sens... jakby nie patrzeć przez chwilę nic nie robisz..')
								tutorial++
								break
								
							case 5:
								msg.channel.send('Oh, jeszcze jedno, lepiej powiedzieć od razu, żeby później nie było siary: Jeśli użyjesz innej astolfo komendy zaczynającej się prefixem `=gra`, to walka zostanie automatycznie poddana... Tak więc już wiesz..')
								tutorial++
							break
						
						}		
						if(enemyTurn == true ){
							
							// OCZEKIWANIE NA REAKCJĘ (potrzeba zrobić const filter)
							await readEMOJI(msg, sent2)
							// OCZEKIWANIE NA REAKCJĘ
							
							 choice = await AI (msg, monster, enemyHP, enemyTarcza,  enemyStats, heroHP, heroTarcza) 
								//AI ZWRACA NAZWĘ ZDOLNOŚCI, KTÓREJ CHCE UŻYĆ, LUB 'Z', KIEDY CHCE UŻYĆ DEUGIEGO WDECHU
								if(choice == 'Z'){
									enemyStats.sila = await Z (enemyStats.sila, monster.sila)
									enemyStats.obrona = await Z (enemyStats.obrona, monster.obrona)
									enemyStats.magicka = await Z (enemyStats.magicka, monster.magicka)
									 text = `${monster.name} zażywa **drugi wdech**`
								} else {
									 skill = require (`./skills/${choice}`)
									 result = await skill.execute (enemyStats.sila, enemyStats.obrona, enemyStats.magicka)
									if(result.obr != null){
										heroTarcza -=  result.obr
										if(heroTarcza < 0){
											heroHP += heroTarcza
											heroTarcza = 0
										}
									}
									if(result.tarcza != null){
										enemyTarcza += result.tarcza
									}
									 text = monster.name + result.text
									
									if(result.sila != null) enemyStats.sila = result.sila
									if(result.obrona != null) enemyStats.obrona = result.obrona
									if(result.magicka != null) enemyStats.magicka = result.magicka
								}
						} else {
							
							result = null
							while (result == null){
								 choice = await readMSG (msg, sent2)
								 if(choice != null)msgSplit = choice.split(' ')
								 else msgSplit[0] = null
								switch(msgSplit[0]){
									case '1':
										if(skill1.execute != null) result = await skill1.execute(sila, obrona, magicka)
										else msg.channel.send('błąd: slot 1. nie zawiera zdolności, spróbuj jeszcze raz')
										break
							
									case '2':
										if(skill2.execute != null) result = await skill2.execute(sila, obrona, magicka)
										else msg.channel.send('błąd: slot 2. nie zawiera zdolności, spróbuj jeszcze raz')
										break
								
									case '3':
										if(skill3.execute != null) result = await skill3.execute(sila, obrona, magicka)
										else msg.channel.send('błąd: slot 3. nie zawiera zdolności, spróbuj jeszcze raz')
										break
								
									case '4':
										if(skill4.execute != null) result = await skill4.execute(sila, obrona, magicka)
										else msg.channel.send('błąd: slot 4. nie zawiera zdolności, spróbuj jeszcze raz')
										break
								
									case '5':
										if(skill5.execute != null) result = await skill5.execute(sila, obrona, magicka)
										else msg.channel.send('błąd: slot 5. nie zawiera zdolności, spróbuj jeszcze raz')
										break
							
									case '=gra':
										msg.channel.send('użyto komendy podczas walki. Walka zakończona porażką')
										return false
							
									case null:
									case 'z':
									case 'Z':
										sila = await Z (sila, stats.sila)
										obrona = await Z (obrona, stats.obrona)
										magicka = await Z (magicka, stats.magicka)
										result = {"text": ' zażywa drugiego wdechu'}
										break
						
									default:
										msg.channel.send('wybierz znak odpowiadający zdolności, której chcesz użyć')
								}
							}
							
							if(result.obr != null){
								
								enemyTarcza -=  result.obr
								if(enemyTarcza < 0){
									enemyHP += enemyTarcza
									enemyTarcza = 0
								}
							}
							
							if(result.tarcza != null){
								heroTarcza += result.tarcza
							}
							 text = `${msg.author}` + result.text
							
							if(result.sila != null) sila = result.sila
							if(result.obrona != null) obrona = result.obrona
							if(result.magicka != null) magicka = result.magicka
							
						}
						
					sent2.delete({timeout:1})
					}
					if (enemyTurn == true) {
						text += '\n Teraz twoja kolej!'
						enemyTurn = false
					}
					else enemyTurn = true
				}

			if (heroHP <= 0) return false
			if (enemyHP <= 0) return true
		}

// <<< ---------------------------------------------------------------------------------------------------------- >>>//
//                                                   			SZTUCZNA INTELIGENCJA															   //
// <<< ---------------------------------------------------------------------------------------------------------- >>>//
		async function AI (msg, monster, enemyHP, enemyTarcza,  enemyStats, heroHP, heroTarcza){
			 enemyStats.sila
			 enemyStats.obrona
			 enemyStats.magicka
			 heroHP = heroHP
			 testy = []
			 desperacja = 0.5
			 wdech = 0
			
			
			 esencja = enemyStats.sila + enemyStats.obrona + enemyStats.magicka
			 maxEsencja = monster.sila + monster.obrona + monster.magicka
///////////////////////////////////////////////////////////////
//					 AI DECYDUJE NAD UŻYCIEM DRUGIEGO WDECHU
			wdech = 0
			if(enemyStats.sila < monster.sila*1/2) wdech ++
			if(enemyStats.obrona < monster.obrona*1/2) wdech ++
			if(enemyStats.magicka < monster.magicka*1/2) wdech ++
			
			if (wdech == 2){
				if(Math.floor(Math.random()*2) == 1) return 'Z'
			}
			if(wdech == 3) {
				return 'Z'
			}
			
///////////////////////////////////////////////////////////////
//	OBLICZANIE DESPERACJI, CZYLI CHĘCI KORZYSTANIA ZE ZDOLNOŚCI DEFENSYWNYCH
			if(enemyHP+enemyTarcza < monster.obrona * (3/4)) desperacja += 0.5
			if(enemyHP+enemyTarcza < monster.obrona * (1/2)) desperacja += 0.5
			if (enemyHP+enemyTarcza < monster.obrona * (1/4)) desperacja += 0.5



///////////////////////////////////////////////////////////////
//	SPRAWDZANIE WARTOŚCI KAŻDEJ ZE ZDOLNOŚCI
//	WARTOŚĆ DEFINIUJE CHĘĆ RZUCENIA POSZCZEGÓLNYCH ZDOLNOŚCI
//	WARTOŚĆ JEST DEFINIOWANA WEWNĄTRZ SAMEJ ZDOLNOŚCI
			 values = []
			 maxValue = 0
			for (i = 1; i <= Object.keys(monster.skills).length; i++){
				 skill = require (`./skills/${monster.skills[i]}`)
				 input = await skill.execute(enemyStats.sila, enemyStats.obrona, enemyStats.magicka)
				if (skill.typ == 'deff') value = input.value * desperacja
				else value = input.value
				if (skill.typ == 'off' && input.obr >= heroHP) value += 1000
				values.push(value)
			}
			maxValue = Math.max.apply(null, values)
			for(i = 0; i <= values.length; i++){
				if(values[i] == maxValue){
					return monster.skills[i+1]
				}
			}
		}

// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                    	FUNKCJA CZYTAJĄCA WIADOMOŚCI (+ USUWANIE)
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
		async function readMSG (msg){
				const filter = (m) => (m.author.id == msg.author.id)
			
				return msg.channel.awaitMessages(filter, {max: 1, time: 120000, errors: ['time']})
					.then((collected) => {
						message = collected.first()
						message.delete({ timeout: 10}) // CZĘŚĆ ODPOWIEDZIALNA ZA USUWANIE
						return message.content
					})
					.catch((collected) => {
						return null
					})
		}
// <<< ---------------------------------------------------------------------------------------------------------- >>> 
//                                     	              FUNKCJA CZYTAJĄCA REAKCJE
// <<< ---------------------------------------------------------------------------------------------------------- >>> 

	async function readEMOJI (msg, sent) {
		const filter = (reaction, user) => {
			return (user.id == msg.author.id && reaction.emoji.name == 'Dalej')
		}
		sent.react('<:Dalej:864098631589429248>')
		output = await sent.awaitReactions(filter, {max: 1, time: 90000, errors: ['time']})
			.then(collected => {
				return true
			})
			.catch(collected => {
				return false
			})
		return output
	}



// <<< ---------------------------------------------------------------------------------------------------------- >>>//
//                                                   		          	DRUGI WCEDH															   				   //
// <<< ---------------------------------------------------------------------------------------------------------- >>>//
		function Z (esencja, statystyka){
			esencja += Math.floor(statystyka/2)
			if(esencja > statystyka){
				esencja = statystyka
			}
			return esencja
		}
	}
}