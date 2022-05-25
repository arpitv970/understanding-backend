const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // running express as function

// app.set("view engine", "pug"); // this would set template engine to pug
app.set("view engine", "ejs"); // this would set template engine to ejs
app.set("views", "views"); // this can be omitted here, as it is useful when we uses name other than views

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes); // '/admin' is used to filter url
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
