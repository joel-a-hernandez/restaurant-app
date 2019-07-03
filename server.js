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

var tableList = [{
  customerName: "Andy",
  phoneNumber: "0",
  customerEmail: "andy@andy.com",
  customerId: "1"
}];
var waitList = [{
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

app.get("/api/reservations", function(req, res){
  console.log(tableList);
  return res.json(tableList);
});

app.get("/api/waitlist", function(req, res){
  console.log(waitList);
  return res.json(waitList);
})

app.post("/api/reservations", function(req, res){
  var newResy = req.body;
  console.log(newResy);
  if(tableList.length < 5){
    tableList.push(newResy);
  }else{
    waitList.push(newResy);
  }
  res.json(newResy);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});