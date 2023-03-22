import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    price: Number,
});
export default  mongoose.model("products",productSchema);