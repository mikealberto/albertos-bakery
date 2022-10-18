require("dotenv").config();
require("./config/database");

//model required to perform CRUD
const Bread = require("./models/bread");
const data = require("./data");


//seeding database with async-await
async function seedAsync() {
    try {
        //delete to avoid duplicate data
        console.log("deleting data....");
        await Bread.deleteMany({});
        console.log("seeding data....");
        await Bread.create(data.breads);
        process.exit();

    } catch (err) {
        console.log(err)
        process.exit();
    }
}

seedAsync();