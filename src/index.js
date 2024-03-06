import createVideoPlayer from './video-player.js';

const videoElement = document.getElementById('videoElement');
const listElement = document.getElementById('listElement');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const seekInput = document.getElementById('enteredTime');
const videoPlayer = createVideoPlayer(videoElement, listElement);

videoPlayer.init('http://localhost:8000/streams');

playButton.addEventListener('click', () => videoPlayer.play());
pauseButton.addEventListener('click', () => videoPlayer.pause());
seekInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        videoPlayer.seek(parseFloat(seekInput.value));
    }
});