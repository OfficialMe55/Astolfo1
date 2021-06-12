module.exports = {
	name: 'tuli',
	description: 'tuli',
	execute(msg, args) {
		const discord = require ('discord.js');
		var fs = require('fs');
		const user = msg.mentions.users.first();
		const author = msg.author;
		//komenda
		var files = fs.readdirSync('./tuli');
		let chosenFile = files[Math.floor(Math.random() * files.length)];
		var wiad = (`UwU, ${user} właśnie został przytulony przez ${author} :heart:`);
		if(user.id == '821689968980000828'){
//			msg.channel.send(`oh... dziękuję ${author}... UwU`, {files: [`./zauroczony.jpg`]});
				var wiad = (`oh... dziękuję ${author}... UwU`);
//		return;
		}
		if(user.id == author.id){
//			msg.channel.send('ojej, to smutne :cry:.. Daj mi się przytulić ^^', {files: [`./tuli/${chosenFile}`]});
				var wiad = ('ojej, to smutne :cry:.. Daj mi się przytulić ^^');
				console.log('tak');
//			return;
		}
		
		if(user.id == 422876065195884544) return;
			const attachment = new discord.MessageAttachment(`./tuli/${chosenFile}`,  `${chosenFile}`);
			const Embed = new discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Astolfo Hug!')
				.setDescription(wiad)
				.attachFiles(attachment)
				.setImage(`attachment://${chosenFile}`)
				
			msg.channel.send(Embed);
			
//		msg.channel.send(`UwU, ${user} właśnie został przytulony przez ${author}`,  {files: [`./tuli/${chosenFile}`]});
		return;
	},
};