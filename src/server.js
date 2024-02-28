const http = require('http');
const sqlite3 = require("sqlite3").verbose();

const port = process.argv[2] ? parseInt(process.argv[2], 10) : 8080;

const db = new sqlite3.Database("playlist.db");

function requestHandler(request, response) {
    if (request.url === '/streams') {
        response.writeHead(200, { 'Content-Type': 'application/json' });

        db.all("SELECT * FROM streams", (err, rows) => {
            if (err) {
                console.error(err.message);

                response.end(JSON.stringify({ error: 'Internal Server Error' }));

                return;
            }

            response.end(JSON.stringify(rows));
        });
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.error(err)
    }

    console.log(`server is listening on ${port}`)
})