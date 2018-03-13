const Mopidy = require("mopidy");

class Music {

  constructor(handleTweet) {
    this.handleTweet = handleTweet;

    this.mopidy = new Mopidy({
      webSocketUrl: "ws://127.0.0.1:6680/mopidy/ws/"
    });

    this.mopidy.on("state:online", () => {
      console.log("Online and ready to play tracks.");
      this.loadPlaylist(process.env.SPOTIFY_PLAYLIST_URL);
    });
  }

  loadPlaylist(spotifyPlaylistUrl) {
    this.mopidy.playlists.lookup(spotifyPlaylistUrl)
      .then(playlist => {
        console.log("Loading playlist: ", playlist.name);
        this.mopidy.tracklist.setSingle(true);
        this.mopidy.tracklist.add(playlist.tracks)
      })
      .then(() => this.mopidy.tracklist.shuffle)
      .catch(() => console.error.bind(console))
      .done();
  }

  playNextTrack() {
    this.mopidy.playback.stop()
      .then(() => this.mopidy.playback.next())
      .then(() => this.mopidy.playback.play())
      .then(() => {
        setTimeout(() => {
          return this.mopidy.playback.getCurrentTrack()
            .then(track => {
              this.handleTweet(track);
            })
        }, 100)
      })
      .catch(() => console.error.bind(console))
      .done();
  }

}

module.exports = Music;