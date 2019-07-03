var express = require("express");
var path = require("path");
var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
    {
        routeName: "dev",
        name: "Dev",
        time: "7:00 PM",
        number: 3,
        phone: "832-523-1603",
        email: "dev@jain.com"
    }
]

var waitList = [
    {
        routeName: "andy",
        name: "Andy",
        time: "8:00 PM",
        number: 1,
        phone: "832-111-1111",
        email: "andy@boyd.com"
    }
]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
})

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
    console.log(reservations)
    return res.json(reservations);
})

app.get("/api/reservations", function (req, res) {
    console.log(reservations);
    return res.json(reservations);
})

app.get("/api/waitlist", function (req, res) {
    console.log(waitList);
    return res.json(waitList);
})

app.post("/add", function (req, res) {
    var newCustomer = req.body;
    newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();
    console.log(newCustomer);
    if (reservations.length <= 5) {
        reservations.push(newCustomer);
    }
    else if (reservations.length > 5) {
        waitLost.push(newCustomer)
    }
    res.json(newCustomer);
})

app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
})