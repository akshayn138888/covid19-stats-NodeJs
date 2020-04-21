const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");

console.log("__dirname: ", __dirname);

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// EASILY
app.use(
  methodOverride((request, response) => {
    if (request.body && request.body._method) {
      const method = request.body._method;
      return method;
    }
  })
);
app.use((request, response, next) => {
  console.log("cookies", request.cookies);
  const username = request.cookies.username;
  response.locals.loggedInUserName = username || "";
  next();
});

// API unirest - Corona
var unirest = require("unirest");

var req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");
req.headers({
  "x-rapidapi-host": "covid-193.p.rapidapi.com",
  "x-rapidapi-key": "576d01f711msh95c5bc8d82ef3ddp14b0edjsnf2c4fb404008"
});
// req.query({
//   country: "Canada"
// });

// get fucntion
app.get("/", (request, response) => {
  const corona = undefined;
  response.render("home", { corona });
});

// Post function

app.post("/stats/:country", (request, response) => {
  let country = request.params.country;
  console.log(country);
  req.query({
    country: country
  });
  req.end(function(res) {
    let corona = res.body;
    console.log(corona);
    response.render("/world", { corona });
  });
});

// GET World
app.get("/world", (request, response) => {
  const corona = undefined;
  response.render("world", { corona });
});

//Server
const PORT = 4545;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});
