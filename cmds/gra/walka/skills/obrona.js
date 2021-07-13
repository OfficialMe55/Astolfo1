module.exports = {
	name: 'obrona',
	typ: 'deff',
	opis: 'Wydaj całą <:Obrona:861669698617081866> obronę, by zdobyć x0.5 tarczy',
	execute (sila, obrona, magicka){
		const tarcza = Math.floor(obrona/2)
		var obrona = 0
		var text = ` Używa **obrony** zyskując ${tarcza} punktów tarczy`
		var value = tarcza
		const output = {"tarcza": tarcza, "obrona": obrona, "text": `${text}`, "value": value}
		return output
	}
}