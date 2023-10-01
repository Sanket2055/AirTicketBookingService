const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const { PORT , DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index")
const setUpandStartServer = async () => {
    // ... other code

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log("Server is listening on port:" + PORT);

        if (DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
    });
}

setUpandStartServer();