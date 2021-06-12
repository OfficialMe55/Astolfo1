module.exports = {
	name: '=roll',
	description: '=roll',
	execute(msg, args) {
				//komenda
			const Discord = require('discord.js');
			const author = msg.author;
			
			if(msg.content == '=roll'){
//				msg.channel.send('Aby rzucić kośćmi musisz ustalić liczbę wyrzucanych kości i ilość ścianek na każdej z nich \n Obie te liczby muszą być oddzielone literą d \n Jeśli nie wybierzesz ilości kostek, to automatycznie rzucę jedną \n Przykładowe komendy to "=roll 3d6" lub "=roll d10"');
			const poradnik = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setDescription('Nie mów, że muszę cię uczyć rzucać internetowymi kośćmi głuptasie! :heart: \n \n Przykładowa komenda to "=roll 3d6", gdzie 3 to ilość wyrzuconych kostek, a 6 to ilość ścianek na każdej z nich UwU')
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
				
			msg.channel.send(poradnik);
				return;
			}
			
			
			let msgSplit = msg.content.split(' ');
			let liczby = msgSplit[1].split('d');
		// sprawdza, czy nie przekroczyłes maksymalnych wartości
		
			if (liczby[0] > 30 || liczby [1] > 200){
				msg.reply('aaaa, nie umiem tak dobrze liczyć :confounded:. Mój limit to 30d200 :cry:');
				return;
			}
			
		// w wypadku braku podanej liczby kostek automatycznie ustawia ich 1
			if (liczby[0] === '') liczby[0] = 1;
			if (Number.isNaN(+liczby[0]) || Number.isNaN(+liczby[1])){ 
			msg.reply('Ojej, chyba nie dam rady rzucić takimi kośćmi :confounded: \n Źle użyta komenda, skorzystaj z liczb i oddziel je literą d (np. 3d6)');
			return
			}
	
		// stworzenie zmiennej suma i tablicy rzuty
			var rzuty = [];
			var suma = 0;
	
		// pętla dodająca kolejne losowe liczby do tablicy
			for (var i = 0;  i < liczby[0]; i++ ){
				var randomowa = Math.floor(Math.random()*liczby[1]+1);
				suma += randomowa;
				if (randomowa == liczby[1] || randomowa == 1){
					var randomowa = (`**${randomowa}**`);
				}
				rzuty.push(randomowa);
				}
//			rzuty.sort(function(a, b){return a-b});
			
			var wyniki = '';
			for (var i = 0; i < rzuty.length; i++){
				wyniki += `${rzuty[i]}`;
				if(i != (rzuty.length - 1)) wyniki += ', ';
			}
			
			msg.channel.send(`Rzuciłem ci kośćmi, ${author} :heart: \n` + '( ' + wyniki + ' )' + `\n W sumie: **${suma}**`);
			if(suma == 69) msg.channel.send('nice :heart_eyes:');
			return
	}
};