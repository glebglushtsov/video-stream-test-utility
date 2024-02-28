class VideoPlayer {
    #listElement;
    #videoElement;

    constructor(videoEl, listEl) {
        this.#listElement = listEl;
        this.#videoElement = videoEl;
    }

    init(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(({data}) => this.#validateStreams(data))
            .then(data => this.#renderPlaylist(data));
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
    }
}

export default VideoPlayer;