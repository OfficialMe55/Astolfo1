module.exports = {
	name: 'magiczny cios',
	typ: 'off',
	opis: 'Wydaj całą <:magicka:861661516766642236> magickę, by zadać x0.5 obr',
	execute (sila, obrona, magicka){
		var obr = Math.floor(magicka/2)
		if (magicka == 1) obr = 1
		var magicka = 0
		var text = ` Używa **magicznego ciosu** zadając ${obr} obrażeń`
		var value = obr
		const output = {"obr": obr, "magicka": magicka, "text": `${text}`, "value": value}
		return output
	}
}