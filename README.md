# phantombot-quotes-to-streamerbot
Export your quotes from PhantomBot to a text file that Streamer.bot can use.

Put this file in the scripts/custom folder of Phantombot. When you start the bot a quotes.dat file will be created in the addons folder. Put this in the data folder of Streamer.bot.


Attention! Use at your own risk!

This script queries the Twitch API to get user id and game id for every quote. From what I understand Phantombot caches information from the API, but since there is no good documentation about how it works I have no idea if it will hammer the API or not.

I have only tested this on a very small quote list and take no responsibility for any problems that might occur with your Phantombot or Twitch account.
