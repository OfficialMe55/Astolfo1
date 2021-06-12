module.exports = {
	name: 'cytat',
	description: 'cytat',
	execute(msg, args) {
		
		const discord = require('discord.js');
		const cytaty = [
		
			[
			//tutaj wprowadzić kolejne cytaty z ,,Nad Niemnem" oddzielone przecinkiem	
		
				'Bywają i insze wiatry, nie te, co w polu świszczą, ale te, co przez drogę życia człowieka przelatują...',
				'Chłopami być czy panami, to za jedno; ale w bydło obrócić się to smętnie i tęskno...',
				'Co tam! Ja panience powiem, że nie trzeba nadmiar troskać się i smęcić. Są na świecie złe ludzie, są i dobre. Podczas smętno bywa, a podczas może być i wesoło. Najgorsza to jest rzecz, kiedy człowiek nic nie robi, a tylko o swoich biedach myśli!',
				'Co, kto miłuje, to i we śnie czuje.',
				'Głęboko trzeba kopać, aby wodę znaleźć, a tym bardziej człowieka, żebyś nie wiedzieć wiele lat z nim przebywał, jeszcze wszystkich skrytości jego nie rozpoznasz...',
				'Jedno zachodzi, drugie wschodzi, a ze smętku, jak z kozła, ani wełny, ani mleka!',
				'Każdy desperuje z początku, a potem i godzi się z takim losem, jaki mu Bóg czy diabeł nasyła.(...) Powiadam ci, że każdy z początku desperuje, a potem jak baran na rzeź spokojnie swoją drogą idzie.',
				'Mężczyzno! puchu marny, ty wietrzna istoto!',
				'Noc po dniu następuje, a dzień po nocy. Śmiech od płaczu smaczniejszy.',
				'– Panno Justyno! – zaczął Jan – niech pani echu powie te imię, które dla pani najmilsze jest na świecie! Proszę, proszę, na wszystko proszę zawołać tego, kto dla pani miły!...(...) \n -Janku!',
				'Przychodzi czasem chwila, w której z dna duszy ludzkiej podnosi się to, co natura na nim posiała i co czekało tylko promienia, powiewu, aby urość w kwiat, kłos albo strzałę. Promień ten, powiew może nie przybyć i wówczas człowiek kładzie się do mogiły samym sobą nie stawszy się nigdy.',
				'Sto przyczyn na sto zamków zamknęło mu usta.',
				'Szczęście wywyższa, szczęście poniża, wszystko na świecie czasowe i przemijające.',
				'Szczęśliwe powodzenie, robi szkodliwe ubezpieczenie.',
				'Tedy gorsze my niż zwierzęta: bo i między zwierzętami swój swego zna. Wilk wilka nie pożera i kruk krukowi oczów nie wydziobuje...',
				'W każdej fali powietrza światła, woni, w każdym kamyku przydrożnym i każdej trawie polnej, w liniach każdego ludzkiego oblicza i westchnieniu każdej piersi ludzkiej tkwi cząstka duszy świata niewidzialnymi nićmi połączona z duszą artysty i w ruch ją wprawiać mogąca.',
				'W życiu jednostek i narodów bywają momenty taką miarą nieszczęść napełnione, że nic już w nich więcej zmieścić się nie może.',
				'(...) wszelakie charaktery wszelako bywają objawiane: u jednego pięknie, u drugiego brzydko... ale to jest forma, czyli powierzchowność i znikomość, a prawdziwy walor człowieka w tym, co on w środku ma...',
				'Wszystko to jest doczesność i znikomość. Nie na takie roboty człowiek patrzył, a wniwecz poszły; nie takimi nadziejami karmił się, a najadł się trucizny... Każda rzecz na świecie jak woda przepływa, jak liść na drzewie żółknie i gnije...',
				'Zawsze jest pora i widzieć i mówić prawdę.',
				'Żaden człowiek sił swoich nie zna, dopóki ich w potrzebie...'
				
			],
			
			[
		//tutaj wprowadzić kolejne cytaty z ,,Lalki" oddzielone przecinkiem	
				'Ale ja nie dbam o taki świat, który dwoje ludzi skazuje na tortury za to tylko, że się kochają. ',
				'Bywają wielkie zbrodnie na świecie, ale chyba największą jest zabić miłość. ',
				'Ach, ci kochani bliźni i to społeczeństwo, które nigdy nie troszczyło się o mnie i stawiało mi wszelkie przeszkody, a zawsze upomina się o ofiary z mojej strony... Lecz właśnie to, co oni dziś nazywają szaleństwem, popycha mnie do pełnienia jakichś fikcyjnych obowiązków. Gdyby nie ono, siedziałbym dziś jak mól w książkach i kilkaset osób miałoby mniejsze zarobki ',
				'Ach, gdyby tylko nie ta kropla żalu, tak mała, a tak gorzka! ',
				'Ach, gdybym wiedział, że śmierć jest zapomnieniem... A jeżeli nie jest?... Nie, w naturze nie ma miłosierdzia... Czy godzi się w nędzne ludzkie serce wlać bezmiar tęsknoty, a nie dać nawet tej pociechy, że śmierć jest nicością? ',
				'A dziś nie ma wojny?... Zmieniła się tylko broń: zamiast kosą albo jataganem walczą rublem. ',
				'Co się tu dziwić szaleństwom ludzi, jeżeli w ten sam sposób szaleją światy... ',
				'Cóż widzę?... Marzyciela, średniowiecznego trubadura, który wymyka się do lasu, ażeby wzdychać i wypatrywać zeszłotygodniowe ślady jej stóp! Wiernego rycerza, który kocha na życie i śmierć jedną kobietę, a innym robi impertynencje. Ach, panie Wokulski, jakie to zabawne... jakie to niedzisiejsze!... ',
				'Czarodziejskie ogrody, bogate pałace, piękne królewny, wierna służba i gotowi do ofiar przyjaciele, wszystko to ma się za pieniądze... ',
				'Człowiek jest jak ćma: na oślep rwie się do ognia, choć go boli i choć się w nim spali. Robi to jednak dopóty – dodał po namyśle – dopóki nie oprzytomnieje. I tym różni się od ćmy...',
				'Człowiek jest wtedy najszczęśliwszy, kiedy dokoła siebie widzi to, co nosi w sobie samym... ',
				'Dla panny Izabeli impertynenckie spojrzenia barona i otwarte nazwanie Wokulskiego jej wielbicielem były strasznym ciosem. Zabiłaby barona, gdyby to uchodziło dobrze wychowanym kobietom. ',
				
			],
		
		]
		
		let msgSplit = msg.content.split(' ');
		var źródło = msgSplit[1]
		if(źródło == 'spis'){
			const Lista = new discord.MessageEmbed()
				.setColor('#fea1af')
				.setTitle('Astolfo Cytat!')
				.setDescription('Spis źródeł: \n 0 - Nad Niemnem \n 1 - Lalka \n \n Jeśli nie wybierzesz sobie źródła, to zrobię to za ciebie :heart:')
				.setThumbnail('https://i.kym-cdn.com/entries/icons/facebook/000/023/661/wfdbaSHt.jpg')
			
			msg.channel.send(Lista);  
			
//			msg.channel.send('Spis żródeł: \n 0 - Nad Niemnem \n 1 - Lalka');
			return
		}

		//ta część odpowiada za wylosowanie dowolnego cytatu z wielu źródeł, a jeśli 
		if (Number.isNaN(+źródło)) {
//			console.log('ok')
			var źródło = Math.floor(Math.random()*cytaty.length)
//			console.log('źródło')
		}
		var cytat = Math.floor(Math.random()*cytaty[źródło].length)



		/*  TUTAJ WYBIERANA JEST OKŁADKA WEDŁUG SPISU
			0 - Nad Niemnem
			1 - Lalka
			2 - ...
		*/

		switch(źródło){
			case 0:
			case '0':
				var okładka = 'https://image.ceneostatic.pl/data/products/58906552/i-nad-niemnem.jpg';
				break
			
			case 1:
			case '1':
				var okładka = 'https://s.znak.com.pl//files/covers/card/f1/T252653.jpg';
				break
		}
		


		const Embed = new discord.MessageEmbed()
			.setColor('#fea1af')
			.setTitle('Astolfo Cytat!')
			.setDescription(cytaty[źródło] [cytat])
			.setThumbnail(okładka)
			
		msg.channel.send(Embed);  
		
	}
}