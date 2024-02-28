const http = require('http');

const port = process.argv[2] ? parseInt(process.argv[2], 10) : 8080;

function requestHandler(request, response) {
    console.log(request.url);
    response.end('playlist will go here')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.error(err)
    }

    console.log(`server is listening on ${port}`)
})