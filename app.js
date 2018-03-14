const Twitter = require('./twitter');
const Music = require('./music');
const Button = require('./button');

const handlePlay = () => {
  music.playNextTrack();
};

const handleTweet = (track, name) => {
  const trackId = track.uri.replace(/spotify:track:/i, '').trim();
  const link = `https://open.spotify.com/track/${trackId}`;
  twitter.tweet(`Someone pressed a blinking button so now I'm playing '${track.name}'. ${link}`);
};

const handlePlaylistLoaded = () => {
  button.setupButton();
};

let twitter;
let music;
let button;

const boot = () => {
  try {
    twitter = new Twitter();
    music = new Music(handleTweet, handlePlaylistLoaded);
    button = new Button(handlePlay);
  }
  catch(err) {
    console.error(`Error starting application ${err}`)
  }
};

const terminate = async (signal) => {
  try {
    console.log(`Application stopping on ${signal}`);
  }
  catch(err) {
    console.log(`Application not stopping gracefully due to error ${err}`);
  }
  process.exit();
};

process.on("SIGINT", () => {
  terminate("SIGINT")
});

process.on("SIGTERM", () => {
  terminate("SIGTERM")
});

boot();






