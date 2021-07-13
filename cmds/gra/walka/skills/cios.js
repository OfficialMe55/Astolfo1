module.exports = {
	name: 'cios',
	typ: 'off',
	opis: 'Wydaj całą <:Sila:861669686889283616> siłę, by zadać x0.5 obr',
	execute (sila, obrona, magicka){
		const obr = Math.floor(sila/2)
		var sila = 0
		var text = ` Używa **ciosu** zadając ${obr} obrażeń`
		var value = obr
		const output = {"obr": obr, "sila": sila, "text": `${text}`, "value": value}
		return output
	}
}