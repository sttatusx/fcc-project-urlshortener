require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(`${process.cwd()}/public`));

// Routes

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/shorturl", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
