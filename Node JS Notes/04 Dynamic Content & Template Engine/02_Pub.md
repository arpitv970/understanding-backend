# Pug
## app.set(`name`, `value`)
Assigns setting `name` to `value`. You may store any value that you want, but certain names can be used to configure the behavior of the server.
```js
...

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

...
```
> For more information check out [Express Docs](http://expressjs.com/en/5x/api.html#app.set)

After setting up some configurations let us jump on `Pug`

## Pug Syntax

Till now our file `shop.pug` looks like this:

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title My Shop
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body
        header.main-header
            nav.main-header_nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
```

> For more information check out [Pug Docs](https://pugjs.org/api/getting-started.html)

## render(`pug file`)

- This is provided by *express.js* and it will use the default templating engine.
- Since all views are in views folder, there is no need to contruct the path
- You may notice that in the below example we have defined our pug file simply by its name i.e. `shop` instead of `shop.pug`, this is because we have already defined our template engine as *pug*
```js
...

router.get('/', (req, res, next) => {
    console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop');
});

...
```

- After rendering pug file go to browser and inspect it, you would find a complete html code instead of our minimal version, as pug generates the html code for us