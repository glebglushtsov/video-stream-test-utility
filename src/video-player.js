function createVideoPlayer(videoElement, listElement) {
    videoElement.addEventListener('error', videoErrorHandler);

    function validateStreams(data) {
        return Promise.all(data.map(stream => {
            const { title, url } = stream;

            return fetch(url, { method: 'HEAD' }).then(response => {
                return { available: response.ok, title, url };
            }).catch(error => {
                console.error(error);
                return { available: false, title, url, error: error.message };
            });
        }));
    }

    function renderPlaylist(data) {
        data.forEach(stream => {
            const { available, title, url } = stream;
            const newOption = document.createElement('option');

            newOption.value = url;
            newOption.title = url;
            newOption.textContent = title ?? url;
            newOption.setAttribute('style', available ? 'color: black' : 'color: red');
            newOption.ondblclick = () => loadStream(url);
            listElement.appendChild(newOption)
        });
    }

    function loadStream(streamUrl) {
        videoElement.setAttribute('src', streamUrl);
        videoElement.play();
    }

    function videoErrorHandler(event) {
        let errorMessage;

        if (event.target.error && event.target.error.code === 4) {
            errorMessage = 'Network error occurred. The stream could not be loaded.';
        } else {
            errorMessage = 'An error occurred while playing the stream.';
        }

        console.error(errorMessage);
    }

    return {
        init(apiUrl) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(({ data }) => validateStreams(data))
                .then(data => renderPlaylist(data));
        },

        play() {
            videoElement.play();
        },

        pause() {
            videoElement.pause();
        },

        seek(position) {
            console.log({
                currentTime: videoElement.currentTime,
                position,
                duration:    videoElement.duration
            });

            if (0 < position < videoElement.duration && !isNaN(position)) {
                videoElement.currentTime = position;
            }
        },
    };
}

export default createVideoPlayer;