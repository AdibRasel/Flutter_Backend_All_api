const mongoose = require("mongoose");
const DataSchema = mongoose.Schema({
    Img: { type: String,},
    ProductCode: { type: String },
    ProductName: { type: String },
    Qty: { type: String },
    TotalPrice: { type: String },
    UnitPrice: { type: String },
   
}, { versionKey: false });

const CRUDModel = mongoose.model("Flutter_CRUD_Project", DataSchema);
module.exports = CRUDModel;