class VideoPlayer {
    #listElement;
    #videoElement;

    constructor(videoEl, listEl) {
        this.#listElement = listEl;
        this.#videoElement = videoEl;

        this.#videoElement.addEventListener('error', () => this.#videoErrorHandler);
    }

    init(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(({data}) => this.#validateStreams(data))
            .then(data => this.#renderPlaylist(data));
    }

    play() {
        this.#videoElement.play();
    }

    pause() {
        this.#videoElement.pause();
    }

    seek(position) {
        console.log({currentTime: this.#videoElement.currentTime, position, duration: this.#videoElement.duration});

        if (0 < position < this.#videoElement.duration && !isNaN(position)) {
            this.#videoElement.currentTime = position;
        }
    }

    #validateStreams(data) {
        return Promise.all(data.map(stream => {
            const {title, url} = stream;

            return fetch(url, {method: 'HEAD'}).then(response => {
                return {available: response.ok, title, url};
            }).catch(error => {
                console.error(error);
                return {available: false, title, url, error: error.message};
            });
        }));
    }

    #renderPlaylist(data) {
        data.forEach(stream => {
            const {available, title, url} = stream;
            const newOption = document.createElement('option');

            newOption.value = url;
            newOption.title = url;
            newOption.textContent = title ?? url;
            newOption.setAttribute('style', available ? 'color: black' : 'color: red');
            newOption.ondblclick = () => this.#loadStream(url);
            this.#listElement.appendChild(newOption)
        });
    }

    #loadStream(streamUrl) {
        this.#videoElement.setAttribute('src', streamUrl);

        this.play();
    }

    #videoErrorHandler(event) {
        let errorMessage;

        if (event.target.error && event.target.error.code === 4) {
            errorMessage = 'Network error occurred. The stream could not be loaded.';
        } else {
            errorMessage = 'An error occurred while playing the stream.';
        }

        console.error(errorMessage);
    }
}

export default VideoPlayer;