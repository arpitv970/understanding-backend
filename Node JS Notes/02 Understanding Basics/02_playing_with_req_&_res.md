# Playing with *request* & *response*

## Understanding *request*
```js
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);    
});

server.listen(3000);
```

## Sending *response*
```js
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node.js Tutorial</title><head>');
    res.write('<body><h1>Tatakae!!</h1></body>');
    res.write('</html>');
    res.end();
    
});

server.listen(3000);
```

## Routing Requests
```js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;    // parsing 'url'
    if (url === '/') {  // In JS "===" means to match both value and its datatype
        res.write('<html>');
        res.write('<head><title>Akatsuki Recruitment</title><head>');
        res.write('<body><form action="message" method="POST"><input type="text" name="joining"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
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
```
## Redirecting Requests
```js
...
    // In the following if ladder we want the url set back to '/' & to create a new file to store the user's message
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'Test Text');
        res.statusCode = 302; // status code for re-direction
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);
...
```

## Parsing Request Bodies

The requests are parsed in buffers, as the following diagram would explain it more effectively

![Stream & Buffer](../screen_shots/stream_buffer.png)

Here is the implementation of Stream & Buffer 
```js
...
    // In the following if ladder we want the url set back to '/' & to create a new file to store the user's message
    if (url === '/message' && method === 'POST') {
        const body = [];    // body will store 'chunks'
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);   // this would push 'chunks' into the 'body'
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();  // now joining 'body' to the buffer as string
            console.log(parsedBody);
            const joining = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', joining);   // this should run with 'req' as JS do not block the code
        });
...
```