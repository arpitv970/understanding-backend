# Blocking & Non-Blocking Code

- The `.writeFileSync` method is *Synchronous*, & it would block the code execution, until the mentioned file is created.
- In this case file involved here is too small, but imagine if file is of large size, there it would take a significant amount of time to resume the code execution, this is the case we don't want to happen.
```js
...
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const joining = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', joining);
            res.statusCode = 302; 
            res.setHeader('Location', '/');
            return res.end();
        });
...
```
- So to avoid the situation, as discussed above, use `.writeFile` method which does not only accept the path & data but also can take 3rd argument, i.e. the callback function.
- This callback function executes only after getting done by file
```js
...
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const joining = parsedBody.split('=')[1];
            fs.writeFile('message.txt', joining, (err) => {
                res.statusCode = 302; 
                res.setHeader('Location', '/');
                return res.end();
            });
...
```