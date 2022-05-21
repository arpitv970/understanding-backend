# Adding Layouts for Pug Templates
- This is really useful, as it extends the pug templates
- Thus one template can be used for various templates and data can be manipulated dynamically using `block`, which pug understands.

Here is the look-out of using this:

*layouts/main-layout.pug* this is the main layout for various other templates
```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        block title
        link(rel="stylesheet", href="/css/main.css")
        block styles

    body 
        header.main-header
            nav.main-header_nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        block content
```

And here is how we extends the layout dynamically:
```pug
extends layouts/main-layout.pug

block styles
    link(rel="stylesheet", href="/css/product.css")

block content 
    h1 Page not Found!
```