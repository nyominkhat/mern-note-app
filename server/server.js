require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const noteRouter = require("./routes/noteRoute");
const userRouter = require("./routes/userRoute");

// express app
const app = express();

// middlewear
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

app.use(cors());

// routes
app.use("/api/notes", noteRouter);
app.use("/api/auth", userRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
