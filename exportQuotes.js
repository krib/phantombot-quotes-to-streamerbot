(function() {
	var file = './addons/quotes.dat', // location to write.
		table = 'quotes', // table to pull.
		keys,
		data = '[',
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
				'"Timestamp":"' + new Date(quoteData[2]).toISOString() + '",' + 
				'"Id":'         + quoteId++          + ','  + 
				'"UserId":'     + user.users[0]._id  + ','  + 
				'"User":"'      + quoteData[0]       + '",' + 
				'"GameId":'     + game.games[0]._id  + ','  + 
				'"GameName":"'  + quoteData[3]       + '",' + 
				'"Quote":"'     + quoteData[1]       + '"'  + 
			'},';
		}

		data = data.slice(0,-1) + ']'; // Remove the trailing comma on the last quote

		$.writeToFile(data, file, false);
		$.consoleLn('Done.');
	}, 6000);
})();