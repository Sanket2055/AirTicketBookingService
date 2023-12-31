const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const { PORT, DB_SYNC, FLIGHT_SERVICE_PATH } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index")
const morgan = require("morgan");

const setUpandStartServer = async () => {
    // ... other code
    app.use(morgan("combined"))
    app.get("/bookingservice/api/v1/home", (req, res) => {
        res.send("Welcome to booking service")
    })
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/bookingservice/api", apiRoutes);

    app.listen(PORT, () => {
        console.log("Server is listening on port:" + PORT);
        // if (DB_SYNC) {
        //     db.sequelize.sync({ alter: true });
        // }
    });
}

setUpandStartServer();