const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath == "./" || filePath == "./index") {
    filePath = "./index.html";
  }
  if (filePath == "./about") {
    filePath = "./about.html";
  }
  if (filePath == "./contact" || filePath == "./contact-me") {
    filePath = "./contact-me.html";
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile("./404.html", (err, data) => {
          res.writeHead(404, { "content-type": "text/html" });
          res.end(data, "utf-8");
        });
      } else {
        res.writeHead(500, { "content-type": "text/html" });
        res.end("Internal server error");
      }
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data, "utf-8");
    }
  });
});

const PORT = 8081;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
