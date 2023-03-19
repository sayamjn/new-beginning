const mongoose = require("mongoose")

const IncomeSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
        trim: true,
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    n: {
        type: String,
        default:1
    },
},{
    timestamps:true
})


module.exports = mongoose.model("Income", IncomeSchema)