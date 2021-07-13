module.exports = {
	name: 'fizzbuzz',
	description: 'fizzbuzz',
		execute(msg, args) {
		for (i = 1; i< 101 ; i++){
			var output = i
				if (Math.floor (i/3) == (i/3) && Math.floor (i/5) == i/5){
					output = 'fizzbuzz'
				} else if(Math.floor (i/3) == (i/3)){
					output = 'fizz'
				} else if(Math.floor (i/5) == (i/5)){
					output = 'buzz'
				}
			console.log(output)
		}
	}
}
