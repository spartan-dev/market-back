require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoConnect =
  process.env.MONGODB_ONLINE || "mongodb://localhost/marketplace";
//middlewares
app.use(express.static("public"));
//body parser express
app.use(fileUpload());
app.use(express.json());

//cookie parser express
app.use(cookieParser());
//database connection local && online
app.use(cors({ origin: true, credentials: true }));
mongoose
  .connect(mongoConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((connect) => {
    app.listen(PORT, console.log(`Server ready to rock 🚀 in port ${PORT}`));
  })
  .catch((error) => console.log("There is some problem with the DB", error));

//Routes
app.get("*", checkUser);
app.use(authRoutes);
app.use(productRoutes);
