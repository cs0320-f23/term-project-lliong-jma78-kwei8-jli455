import * as http from "http";
import * as util from "util";

// This is a JSON for a song on spotify
const informativeJson = {
  name: "slide tackle",
  duration: 12345,
  artists: ["japanese breakfast"],
  album: "jubilee",
  popularity: 100,
  genre: "alternative",
};

// This function is called when a request is made to the server, it returns the JSON above.
function handle(req, res) {
  util.inspect(req);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);
  res.end(JSON.stringify(informativeJson));
}

// This starts the server then logs a message to the terminal once it is started and when
// a connection is made.
const server = http.createServer(handle);
const hostname = "localhost";
const port = 3232;
server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});

server.on("connection", (info) => {
  console.log(`Connection made`);
});
