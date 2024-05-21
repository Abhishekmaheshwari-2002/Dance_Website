const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ContactDance");

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;
// Defiend Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);


// Express related code
app.use("/static", express.static("static")); //for serving static files
app.use(express.urlencoded());
// PUG related code
app.set("view engine", "pug"); // see the template engine as pug
app.set("views", path.join(__dirname, "views")); // set the view directory
// End points
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("index.pug", params);
});
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render("contact.pug", params);
});
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    });
    // res.status(200).render("contact.pug");
})
//Start the server
app.listen(port, () => {
    console.log(`The app started on port ${port}`);
});
