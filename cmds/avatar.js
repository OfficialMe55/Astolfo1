module.exports = {
	name: 'avatar',
	description: 'avatar',
		execute(msg, args) {
			const Discord = require('discord.js');
			
			const user = msg.mentions.users.first() || msg.author;
			const avatarEmbed = new Discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Astolfo Avatar!')
				.setDescription(`Ten avatar należy do ${user}`)
				.setImage(user.displayAvatarURL());
			msg.channel.send(avatarEmbed);
			return
	}
}
