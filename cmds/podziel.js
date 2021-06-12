module.exports = {
	name: 'podziel',
	description: 'podziel',
		execute(msg, args) {
		let Split = msg.content.split(' ')
		let X = Split[1]/Split[2]
		msg.channel.send('wynik: ' + X) 
		return
	}
}
