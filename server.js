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

// Database

const urls = []
console.log("urls", urls);

// Utils

function validateUrl(url) {
  return RegExp(/https?:\/\//).test(url)
}

// Routes

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url

  if (!url) res.status(400).json({ error: 'Invalid URL' })
  
  const isValid = validateUrl(url)

  if (!isValid) res.status(400).json({ error: 'Invalid URL' })

  const data = { original_url: url, short_url: urls.length + 1 }

  urls.push(data)
  res.status(201).json(data);
});

app.get("/api/shorturl/:url", (req, res) => {
  const shortUrl = req.params.url
  const originalUrl = urls[shortUrl - 1].original_url

  console.log("originalUrl:", originalUrl);

  res.redirect(301, originalUrl);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
