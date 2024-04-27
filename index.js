const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require('./src/routes/User');
const jobRoute = require('./src/routes/Job');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(userRoute);
app.use(jobRoute);

app.use((error,req,res,next) => {
  console.log(error)
  res.status(500).json({
    message:"Something went wrong !!"
  })
});

app.get("/", (req, res) => {
  res.send("Hello Guys...");
});



app.listen(process.env.PORT, () => {
  try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("DB Connected Successfully, Server is Up at Port no:", process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
});
