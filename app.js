var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  https = require("https");
app.use(bodyParser.urlencoded({
  extended: !0
}));
app.use(express["static"]("public"));
var bodyWorld,
  optionsWorld = {
    method: "GET",
    hostname: "corona-virus-world-and-india-data.p.rapidapi.com",
    port: null,
    path: "/api",
    headers: {
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
      "x-rapidapi-key": "cfaa20c42bmshbce894d2f056cedp1f2134jsnb73068c89b0d"
    }
  },
  reqW = https.request(optionsWorld, function(a) {
    var b = [];
    a.on("data", function(a) {
      b.push(a)
    });
    a.on("end", function() {
      bodyWorld = Buffer.concat(b)
    })
  });
reqW.end();
var optionsIndia = {
    method: "GET",
    hostname: "corona-virus-world-and-india-data.p.rapidapi.com",
    port: null,
    path: "/api_india",
    headers: {
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
      "x-rapidapi-key": "ee804b6db0msh1104c691236b926p1215d6jsncdfef605c51a"
    }
  },
  reqI = https.request(optionsIndia, function(a) {
    var b = [];
    a.on("data", function(a) {
      b.push(a)
    });
    a.on("end", function() {
      bodyIndia = Buffer.concat(b);
      JSON.parse(bodyIndia)
    })
  });
reqI.end();
app.get("/", function(a, b) {
  b.sendFile(__dirname + "/index.html")
});
app.get("/jsonworld", function(a, b) {
  b.send(bodyWorld.toString())
});
app.get("/jsonindia", function(a, b) {
  b.send(bodyIndia.toString())
});
app.get("/signup", function(a, b) {
  b.sendFile(__dirname + "/signup.html")
});
app.post("/signup", function(a, b) {
  var d = JSON.stringify({
      members: [
        {
          email_address: a.body.email,
          status: "subscribed",
          merge_fields: {
            FNAME: a.body.fname,
            LNAME: a.body.sname
          }
        }
      ]
    }),
    c = https.request("https://us19.api.mailchimp.com/3.0/lists/93d23c5bc0", {
      method: "POST",
      auth: "rittik:9762d78ae886bc4931b126ae87b3e1d3-us19"
    }, function(a) {
      200 === a.statusCode
        ? b.sendFile(__dirname + "/success.html")
        : b.sendFile(__dirname + "/failure.html");
      a.on("data", function(a) {
        console.log(JSON.parse(a))
      })
    });
  c.write(d);
  c.end()
});
app.post("/failure", function(a, b) {
  b.redirect("/signup")
});
app.post("/success", function(a, b) {
  b.redirect("/")
});
app.listen(process.env.PORT || 3E3, function() {
  console.log("Server up and running on port 3000.")
});
