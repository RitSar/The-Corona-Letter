const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var bodyWorld;
var optionsWorld = {
  "method": "GET",
  "hostname": "covid-193.p.rapidapi.com",
  "port": null,
  "path": "/statistics",
  "headers": {
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
    "x-rapidapi-key": "cfaa20c42bmshbce894d2f056cedp1f2134jsnb73068c89b0d"
  }
};

var reqW = https.request(optionsWorld, function (resW) {
  var chunks = [];

  resW.on("data", function (chunk) {
    chunks.push(chunk);
  });

  resW.on("end", function () {
    bodyWorld = Buffer.concat(chunks);
  });
});
reqW.end();


var optionsIndia = {
  "method": "GET",
  "hostname": "corona-virus-world-and-india-data.p.rapidapi.com",
  "port": null,
  "path": "/api_india",
  "headers": {
    "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
    "x-rapidapi-key": "cfaa20c42bmshbce894d2f056cedp1f2134jsnb73068c89b0d"
  }
};

var reqI = https.request(optionsIndia, function (resI) {
  var chunks = [];

  resI.on("data", function (chunk) {
    chunks.push(chunk);
  });

  resI.on("end", function () {
    bodyIndia = Buffer.concat(chunks);
    var dataIndia = JSON.parse(bodyIndia);
  });
});

reqI.end();

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.get("/jsonworld",function(req,res){
  res.send(bodyWorld.toString());
})


app.get("/jsonindia",function(req,res){
  res.send(bodyIndia.toString());
})


app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/signup",function(req,res){
  const firstName = req.body.fname;
  const surName = req.body.sname;
  const email = req.body.email;
  // console.log(firstName, surName, email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: surName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/93d23c5bc0";
  const options = {
    method: "POST",
    auth: "rittik:9762d78ae886bc4931b126ae87b3e1d3-us19"
  }
  const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/signup");
});
app.post("/success",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server up and running on port 3000.");
})
