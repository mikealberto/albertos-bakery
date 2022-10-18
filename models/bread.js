const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    content: String,
    rating: {type: String, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
})

const breadSchema = new Schema(
    {
        name: String,
        description: String,
        ingredients: String,
        reviews: [reviewSchema]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bread", breadSchema);