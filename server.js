const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const path = require('path');
const product = require("./models/product");
require("dotenv").config();

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb+srv://ridwan:hacker@2020@cluster0.urokm.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));


// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.get('/gg', async (req, res) => {
  let total = await product.find({}).estimatedDocumentCount().exec();
  res.json(total);
})
// routes middleware
// readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
// app.use(express.static(path.join(__dirname, "../client", "build")))

// //serve
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
// });

// port
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));
