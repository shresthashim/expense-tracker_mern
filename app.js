const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
// app.use(cors());

// app.use(express.static(path.join(__dirname, "./frontend/build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
// });

//routes
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)));

const server = () => {
  db().then(() => {
    app.listen(PORT, () => {
      console.log("listening to port:", PORT);
    });
  });
};

server();
