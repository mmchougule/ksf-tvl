const express = require("express");
const app = express();
const tvl = require("./api/tvl");
const oneDay = 1000 * 60 * 60 * 24;
const sessions = require('express-session');
const cors = require("cors");

app.use(cors())

app.use(express.json({ extended: false }));

app.use("/api/tvl", tvl);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
