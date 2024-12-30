const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const urlRoutes = require("./routes/urls.route");
const logger = require("./support_functions/logger");
const connectToDatabase = require("./database_config");

app.use(express.json());

connectToDatabase();

app.use('/url', urlRoutes);

app.listen(PORT, () => {
    const message = `Server is running on http://localhost:${PORT}`;
    logger(message);
    console.log(message);
})

