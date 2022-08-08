# Setting up cookie
- We need a global variable but in such a manner that it can be accessed by respective users only
- Thus we set such data in cookie
- The cookie can be set at the header

```js
...

    res.setHeader('Set-Cookie', 'loggedIn=true');

...
```

- We can set age of the cookie by setting in expire date

```js
...

    res.setHeader('Set-Cookie', 'loggedIn=true; Expires=09-06-2023');

...
```
--- or ---
```js
...

    res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10');

...
```

- We can make cookie more secure by setting `Secure`, it only serves cookie when request is server through `https`
```js
...

    res.setHeader('Set-Cookie', 'loggedIn=true; Secure');

...
```
