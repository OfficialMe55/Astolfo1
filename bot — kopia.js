console.log('Starting');

require("dotenv").config();

//wymagane inicjacje
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const config = require('./config.json');
var fs = require('fs');





//login do discorda
client.login(process.env.BOTTOKEN);
client.on('ready', readyDiscord);

//funkcja po odpaleniu bota
function readyDiscord() {
	console.log ('Astolfo');
}


//funkcja po wpisaniu dowolnej wiadomości
client.on('message', async (msg) => {
	
	//wyklucza wiadomości wysłane przez bota
		if (msg.author.bot) return;
	
	// poniżej znajduje się nielegalna linijka kodu xd
	//    console.log(msg.guild.name, '-', msg.channel.name,'-',msg.author.username, '-', msg.content);
	// Astolfo nie chce nikogo infiltrować, a jak zostanie do tego użyty, to się pogniewa >.<
	
	//ta linijka służy tylko do weryfikowania "zawieszeń" bota
		const currentDate = new Date();
		console.log(currentDate.toLocaleString());
	
//komenda tuli, odłączna od Switcha
//komendy z "prefixami"

let msgSplit = msg.content.split(' ');

const author = msg.author;
const user = msg.mentions.users.first();

switch(msgSplit[0]) {
	case 'tuli':
		var files = fs.readdirSync('./tuli');
		let chosenFile = files[Math.floor(Math.random() * files.length)];
		if(user.id == '821689968980000828'){
			msg.channel.send(`oh... dziękuję ${author}... UwU`, {files: [`./zauroczony.jpg`]});
		return;
		}
		if(user.id == author.id){
			msg.channel.send('ojej, to smutne :cry:.. Daj mi się przytulić ^^', {files: [`./tuli/${chosenFile}`]});
			return;
		}
			
		msg.channel.send(`UwU, ${user} właśnie został przytulony przez ${author}`,  {files: [`./tuli/${chosenFile}`]});
		return;
		
	case '=r':
	case '=roll':
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
//			console.log(i, randomowa);
			rzuty.push(randomowa);
			}
		rzuty.sort(function(a, b){return a-b});
		
		var wyniki = '';
		for (var i = 0; i < rzuty.length; i++){
			wyniki += `${rzuty[i]}`;
			if(i != (rzuty.length - 1)) wyniki += ', ';
		}
		console.log(wyniki);
		
		msg.channel.send(`Rzuciłem ci kośćmi, ${author} :heart: \n` + '( ' + wyniki + ' )' + `\n W sumie: **${suma}**`);
		if(suma == 69) msg.channel.send('nice :heart_eyes:');
		return
}
	
	
	//komenda pingująca Natana za każdym razem, gdy ktoś wspomni o grzybie
	if(msg.content.toLowerCase().includes('grzyb'.toLowerCase()) && msg.guild.id == '455086148105142329'){
		msg.channel.send('<@368404318342217738>');
	}
	if(msg.content.toLowerCase().includes('pomidor'.toLowerCase()) && msg.guild.id == '455086148105142329'){
		msg.channel.send('<@324945476824727553>');
	}


//Switch na komendy aktywujące się po wpisaniu specyficznej wiadomości
	switch (msg.content){
	
		case 'mordred':
		msg.reply('spadaj, tylko Astolfo :heart_eyes:');
		break;
		
		case 'ofiś fałszywa kpopiara':
		msg.reply('- fałszywa bociara');
		break;
		
	// Komenda 'straszna' działa tylko dla osoby o id '305383299197435914' (tutaj Rosemary)
		case 'straszna':
		if (msg.author.id == '305383299197435914'){
			msg.channel.send('buuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
		} else {
			msg.channel.send('tylko rosemary może straszyć :<');
		}
		break;

	// Komenda Astolfo wykorzystuje API tenora.
		case 'astolfo':
		let url = `https://g.tenor.com/v1/search?q=astolfo&key=${process.env.TENORKEY}`;
		let response = await fetch(url);
		let json = await response.json();
		let losowa = Math.floor(Math.random()*(json.results.length-1));
//		console.log(json.results.length);
//		console.log(losowa);
//		console.log(json);
		msg.channel.send(json.results[losowa].url);
		break;

	case 'autor?':
	if(msg.author.id =='275658656727695364') msg.channel.send ('Autor? Przecież ty mnie stworzyłeś, Ofiś :heart:');
	}

});