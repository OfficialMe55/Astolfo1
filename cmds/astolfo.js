module.exports = {
	name: 'astolfo',
	description: 'astolfo',
	execute(msg, args) {
		const fetch = require('node-fetch');
			let url = `https://g.tenor.com/v1/search?q=astolfo&key=${process.env.TENORKEY}`
			fetch(url)
				.then(r => r.json())
				.then(data => {
					let losowa = Math.floor(Math.random()*(data.results.length-1));
					msg.channel.send(data.results[losowa].url);
				})
	}
}