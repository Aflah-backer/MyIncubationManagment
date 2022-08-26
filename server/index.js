const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AdminRoutes = require("./Routes/AdminRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const app = express();
const cookieParser = require("cookie-parser");

app.listen(4000, () => {
  console.log("Server started on port 4000!");
});

mongoose
  .connect("mongodb://0.0.0.0:27017/incubation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", UserRoutes);
app.use("/admin", AdminRoutes);
