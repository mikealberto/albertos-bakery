const mongoose = require("mongoose");

//string for connecting mongo db in the cloud
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});