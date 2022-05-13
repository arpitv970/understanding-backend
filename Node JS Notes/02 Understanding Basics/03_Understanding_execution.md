# Understanding Event driven Code Execution

- The order of execution of code is not necessarily the order of the code written, for example the `fs.writeFileSync('message.txt', joining);` would execute after the *response code* (code below it).
- Thus here are two implications:
  - After sending a *response* does not mean that event listener are dead
  - If we do something in the event listener, that would also influence the *response*

- Therefore, code below is the wrong way of setting it up, we should then also move the response code into the event listener
```js
...
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const joining = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', joining);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
...
```
Correct way to set-up
```js
...
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const joining = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', joining);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
...
```
- It also important to understand that, if the `req.on()` or code like `http.createServer()` these are some example where *Node.js* uses a pattern where you pass a function to a function and node will execute these passed-in function at later point of time, which is called *Asynchronously*.
- So when *Node.js* hits the event listener, it will add new event listener internally, manages all the event listener internally.