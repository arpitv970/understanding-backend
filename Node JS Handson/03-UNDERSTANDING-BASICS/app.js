const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;    // parsing 'url'
    const method = req.method;  //parsing 'method'
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Akatsuki Recruitment</title><head>');
        res.write('<body><form action="message" method="POST"><input type="text" name="joining"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();    
    }

    // In the following if ladder we want the url set back to '/' & to create a new file to store the user's message
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'Test Text');
        res.statusCode = 302; // status code for re-direction
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node.js Tutorial</title><head>');
    res.write('<body><h1>Tatakae!!</h1></body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);