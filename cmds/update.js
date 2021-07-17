module.exports = {
	name: 'update',
	description: 'update',
	execute(msg, args) {
		
		const fs = require('fs')
		
		if(msg.author.id != 275658656727695364) return
		console.log('update')
		const files = fs.readdirSync('./MEMORY/rejestr').filter(file => file.endsWith('.json'));
		
		for (const file of files) {
			var plik = require(`../MEMORY/rejestr/${file}`);
			var rejestr = `./MEMORY/rejestr/${file}`
			
///////////////////////////////////////////////////////
			var output = {
				"ID": plik.ID,
				"klasa": plik.klasa,
				"lvl": plik.lvl,
				"sila": plik.sila,
				"obrona": plik.obrona,
				"magicka": plik.magicka,
				"skills": {
					"1": plik.skills[1],
					"2": plik.skills[2],
					"3": plik.skills[3],
					"4": plik.skills[4],
					"5": plik.skills[5]
				},
				"bonusHP": 0
			}
///////////////////////////////////////////////////////
		console.log(output)
		fs.writeFile(rejestr, JSON.stringify(output, null, 2), err => {if(err) console.log(err)})
		}
		
	}
}