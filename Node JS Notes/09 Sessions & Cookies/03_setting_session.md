# Setting up session
- To manage our sessions we need third-party packages to make that happen
- Here we use express sessions

```
npm install --save express-session
```
- First we will import `express-session` in a **const** let say session
- Now we register an middleware with `app.use()`, there we pass `session` function
- In there `session` we would pass the *JavaScript* object, such as setting a **secret** key that is responsible for storing session ID secretly
- We can pass `resave` to *false* as it does not saves the session on every request that is *done*, thus improves the performance
- `saveUninitialized` can be used to ensure the same

```js
...

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

...
```

- Let us look at example where we set `isLoggedIn` for authentication

```js
...

        req.session.isLoggedIn = true;
        req.session.user = user;    // the user is retrived from code above

...
```

## The Problem till now
- Till now there is no problem in sessions execpt for the storing part
- Storing a session in memory could be inefficient with large scale
- Also this practice is not ideal from security perspective
- Thus here we store session to the cloud database such her **MongoDB** in our case
- We need an express package: `connect-mongodb-session`

```
npm install --save connect-mongodb-session
```

## Store session
- We import `connect-mongodb-session` to store the *session*

```js
...

const MongoDBStore = require('connect-mongodb-session')(session);

...
...

// store constructor
const store = new MongoDBStore({
    uri: MONGODB_URI,   // connection string
    collection: 'sessions',    // specifing the collection name for MongoDB
});

...
...

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,   // now it makes sense to use store in this middleware
    })
);

...

```