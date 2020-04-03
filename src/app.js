const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000; // heroku가 사용해야할 port를 제공하므로 우리는 그것을 사용해야 한다. 만약 heroku가 아닐 겨우 3000사용

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kim",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kim",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Kim",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please provide address for search");
  }
  address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send(error); //error handling: return //error만 입력해야 {}시 에러가 발생하지 않음 - app crash방지
    }
    forecast(latitude, longitude, (error, weather_data) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        address: address,
        location: location,
        weather: weather_data,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("Please provide search term"); //return을 사용하여 안전한 에러처리
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 page",
    name: "Kim",
    errorMessage: "Help articles not found",
  });
});

//*: 명시하지 않은 모든 페이지 else같은 느낌
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 page",
    name: "Kim",
    errorMessage: "Page not Found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
  console.log(__dirname);
  console.log(publicDirectoryPath);
});
