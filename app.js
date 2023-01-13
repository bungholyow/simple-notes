require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const overrideMethod = require("method-override");

const app = express();
const port = 5000 || process.env.PORT;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
    // Date.now() - 30 * 24 * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(overrideMethod("_method"));

//konek ke db
connectDB();

// file statik
app.use(express.static("public/"));

// templating engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// routes
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/dashbor"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
