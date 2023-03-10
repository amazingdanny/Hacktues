const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./db.js");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/test", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/user/:userid", async (req, res) => {
    const result = await db.query('SELECT * FROM users WHERE id = ?', [req.params.userid]);
    res.json({result});
    
    
});
// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


