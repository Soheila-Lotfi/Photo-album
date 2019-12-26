

const express = require("express");
const routes = require("./routes");

let session = require("express-session");


const app = express();
const PORT = process.env.PORT || 3099;

// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
    secret: "photogallery",
    resave: true,
    saveUninitialized: true
  })
);

// Routes
app.use(routes);


// run the server
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });


module.exports = app;
