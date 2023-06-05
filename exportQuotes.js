(function() {
	var file = './addons/quotes.dat', // location to write.
		table = 'quotes', // table to pull.
		keys,
		data = '{"version": 0,"t": "' + new Date().toISOString() + '","quotes": [',
		i,
		quoteId = 1,
		quoteData,
		user,
		game;

	setTimeout(function() {
		$.consoleLn('Writing data from ' + table + ' to ' + file);
		keys = $.inidb.GetKeyList(table, '');

		for (i in keys) {
			quoteData = JSON.parse($.inidb.get('quotes', keys[i])); // Get the next quote data

			user = JSON.parse($.twitch.GetUser(quoteData[0]));
			game = JSON.parse($.twitch.SearchGame(quoteData[3]));

			data += '{' + 
				'"timestamp":"' + new Date(Number(quoteData[2])).toISOString() + '",' + 
				'"id":'         + quoteId++          + ','  + 
				'"userId":'     + user.users[0]._id  + ','  + 
				'"user":"'      + quoteData[0]       + '",' + 
				'"platform": "twitch",' + 
				'"gameId":'     + game.games[0]._id  + ','  + 
				'"gameName":"'  + quoteData[3]       + '",' + 
				'"quote":"'     + quoteData[1]       + '"'  + 
			'},';
		}

		data = data.slice(0,-1) + ']}'; // Remove the trailing comma on the last quote

		$.writeToFile(data, file, false);
		$.consoleLn('Done.');
	}, 10000);
})();
