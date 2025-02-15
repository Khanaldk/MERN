const express = require("express");
const app = express();
const connectDB = require("./config/db");
const User = require("./models/userModel");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

connectDB();
const corsOptions = {
    origin: "https://mern-mtsl.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"]
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 4000;
app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
