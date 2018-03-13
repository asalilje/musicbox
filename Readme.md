# MusicBox
MusicBox, a node app waiting for button pushes. Every push plays a new track from a chosen Spotify playlist.

Deployed on a Raspberry Pi, connected via GPIO 2 and 17 to a button and a LED. Playing music using Mopidy with the Spotify extension.

Some environment values needs to be added:
- SPOTIFY_PLAYLIST_URL
- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET
- TWITTER_ACCESS_TOKEN_KEY
- TWITTER_ACCESS_TOKEN_SECRET

The button blinks for 10 seconds with a 20 seconds interval. During this time it is active. When a song is played, a tweet is made about it.

Link to blogpost on how to set up your pi and run this using Docker: 
