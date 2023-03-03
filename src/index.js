const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("./strategies/local");

// Routes
const authRouter = require("./routes/auth");
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");

require("./database");

const app = express();
const PORT = 3001;
// const memoryStore = new session.MemoryStore();

mongoose
  .connect("mongodb://localhost:27017/expressjs_tutorial")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  session({
    secret: "HDHGJHFDGJKDHFGKDFYGUTYUYIOTRGNJHJHJKHKJ",
    resave: false,
    saveUninitialized: false,
    // store: memoryStore,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/expressjs_tutorial",
    }),
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

// app.use((req, res, next) => {
//   console.log(memoryStore, "memory store");
//   next();
// });

//login i middleware drecink verevum vor login ejy unauthorised chlini
//kam el karox eink ays nerqevi 2rd midlleware(auth) dnel ayn router neri ejeri mej voronk petq e unathorised cuyc tan
app.use("/api/auth", authRouter);

// app.use((req, res, next) => {
//   if (req.session.user)
//     next(); //kkanchi hajord middleware ,yuraqanchyur route i mejiny
//   else res.send(401);
// });

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/groceries", groceriesRoute);
app.use("/api/markets", marketsRoute);

app.listen(PORT, () => console.log(`running express server on Port ${PORT}`));

//------------------------------------------------------------------------------------

// const groceryList = [
//   {
//     item: "milk",
//     quantity: 2,
//   },
//   {
//     item: "cereal",
//     quantity: 1,
//   },
//   {
//     item: "pop-tarts",
//     quantity: 3,
//   },
// ];

// app.get(
//   "/groceries",
//   //   (req, res, next) => {
//   //     console.log("before handling request");
//   //     next()//kanchi hajord middleware functiony, ays callback function nern el en hamarvum middleware
//   //   },
//   (req, res, next) => {
//     res.send(groceryList);
//     // next()
//   }
//   //   (req,res)=>{
//   //     console.log("finished executing get request")
//   //     res.send(403)
//   //   }
// );

// app.get("/groceries/:item", (req, res) => {
//   // console.log(req.params.item);
//   const { item } = req.params;
//   const groceryItem = groceryList.find((g) => g.item === item);
//   console.log(groceryItem);
//   res.send(groceryItem);
// });

// app.post("/groceries", (req, res) => {
//   console.log(req.body);
//   groceryList.push(req.body);
//   res.send(201);
// });
