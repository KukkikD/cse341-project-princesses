require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDb } = require("./db/connection");
const princessRoutes = require("./routes");
const session = require("express-session");
const passport = require("passport");
require("./auth/github"); // GitHub OAuth setup
const swaggerUi = require("swagger-ui-express"); 
const swaggerDocument = require("./swagger.json"); // for swagger static
//const swaggerRoutes = require("./routes/swagger"); // for swagger dynamic
const jsonErrorHandler = require("./middleware/jsonErrorHandler");

const app = express();

/* Session + Passport */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


/* Swagger route */
//app.use("/", swaggerRoutes); //swagger dynamic
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // swagger static

/* middleware */
app.use(bodyParser.json());
//app.use(express.json()); // Express 5: built-in json parser

/*  catch body parser error */
app.use(jsonErrorHandler);

/* CORS */
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //header CORS (Cross-Origin Resource Sharing) : Allow all domains to access this API.
  next();
});*/

app.use(cors({
  origin: "https://cse341-project-princesses.onrender.com", // put specific URL ex. http://localhost:8083
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* Main route */
app.use("/", princessRoutes);

/* Global Error Handlers - place before server*/
process.on("uncaughtException", (err, origin) => {
  console.error("❗ Uncaught Exception:", err.message);
  console.error("Origin:", origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❗ Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
});

/* Start server */
connectToDb().then(() => {
  const PORT = process.env.PORT || 8083;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}.`);
  });
});
