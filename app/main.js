const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        const request = data.toString();
        const path = request.split(" ")[1];
        if (path === "/") {
          socket.write("HTTP/1.1 200 OK\r\n\r\n");
        }
        else if(path.startsWith("/echo")){
            const s = path.substring(6)// that is  "/echo/{s}"
            socket.write("HTTP/1.1 200 OK\r\n");
            socket.write("Content-Type: text/plain\r\n");
            socket.write(`Content-Length: ${s.length()}\r\n`);
            socket.write("\r\n");
            socket.write(s);
        } else {
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
      });
  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
