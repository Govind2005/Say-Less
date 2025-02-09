import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
    {
        name: String,
        type: String,
        image: String,
        price: Number,
        available: Boolean,
    },
    {
        timestamps: true,
    } 
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item; 