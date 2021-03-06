require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const server = express();

server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, "client/build")));

console.log(process.env.USER);
console.log(process.env.SHELL);

if (process.env.NODE_ENV === "production") {
  console.log("means code is deployed");
}

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

server.get("/api", (req, res) => {
  res.json({ message: process.env.COHORT });
});

server.use((req, res) => {
  res.status(404).json({ message: "my bad" });
});

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
