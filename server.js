// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [{
  customerName: "Andy",
  phoneNumber: "0",
  customerEmail: "andy@andy.com",
  customerId: "1"
}];
var waitlist = [{
  customerName: "Joel",
  phoneNumber: "2",
  customerEmail: "joel@joel.com",
  customerId: "2"
}];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res){
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/list", function(req, res){
  res.sendFile(path.join(__dirname, "list.html"));
});

app.get("/api/tables", function(req, res){
  console.log(tables);
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res){
  console.log(waitlist);
  return res.json(waitlist);
})

app.post("/api/reservations", function(req, res){
  var newResy = req.body;
  console.log(newResy);
  if(tables.length < 5){
    tables.push(newResy);
  }else{
    waitlist.push(newResy);
  }
  res.json(newResy);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});