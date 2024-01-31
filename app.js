const express = require("express");
const hbs = require("hbs");
const path = require("path");
const weatherData = require("./utils/weatherData");
const app = express();
const port = process.env.PORT || 3111;

const publicStationDirPath = path.join(__dirname, "./public");
const partialPath = path.join(__dirname, "./template/partial");
const viewsPath = path.join(__dirname, "./template/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicStationDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Korede Weather App",
  });
});

//local:host:3111/weather?address=lagoos
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address)
    return res.send({
      err: "Youu must enter address in search text box",
    });
  weatherData(address, (err, { temperature, description, cityName } = {}) => {
    if (err) {
      return res.send({
        err,
      });
    }
    console.log(temperature, description, cityName);
    res.send({
      temperature,
      description,
      cityName,
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found ",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
