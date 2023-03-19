const dataModel = require("../models/dataModel");


exports.getIncome = async (req, res, next) => {
    try {
        const income = await dataModel.find();
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
        
    }
  };
