const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb } = require("./db/connection");
const princessRoutes = require("./routes");
const session = require("express-session");
const passport = require("passport");
require("./auth/github"); // GitHub OAuth setup
const swaggerUi = require("swagger-ui-express"); // eslint-disable-line no-unused-vars
const swaggerDocument = require("./swagger.json"); // for swagger static
const swaggerRoutes = require("./routes/swagger"); // for swagger dynamic
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
app.use("/", swaggerRoutes); //swagger dynamic
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // swagger static

/* middleware */
// middleware check that loggged in 
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

app.get("/protected", ensureAuthenticated, (req, res) => {
  res.json({ message: "You are logged in with GitHub!", user: req.user });
});

app.use(bodyParser.json());

/*  catch body parser error */
app.use(jsonErrorHandler);

/* CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //header CORS (Cross-Origin Resource Sharing) : Allow all domains to access this API.
  next();
});

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
