class VideoPlayer {
    #listElement;
    #videoElement;

    constructor() {
        console.log('VideoPlayer.constructor()', arguments)
    }

    init(videoElement, listElement) {
        this.#listElement = listElement;
        this.#videoElement = videoElement;
        console.log('VidoePlqyer.init()', arguments)
    }

    test() {
        console.log('VidoePlqyer.test()', arguments)
        fetch('http://localhost:8000/streams', { mode: 'no-cors' }).then(response => response.json()).then(console.log);
    }
}

export default VideoPlayer;