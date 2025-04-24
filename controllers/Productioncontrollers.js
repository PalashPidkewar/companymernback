import mongoose from "mongoose";
import ProductionSchema from "../models/Production.js";

export const addProduction = async (req, res) => {

    try {
        const { date, shift, operatorName, bundleCount, totalWeightKg, remarks } = req.body;
        const newRecord = await ProductionSchema.create({
            date,
            shift,
            operatorName,
            bundleCount,
            totalWeightKg,
            remarks,
            createdBy: req.user.id,
        });
        res.status(201).json({ message: 'Production entry added', data: newRecord });
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json({msg:`no`})
    }


};


export const getProduction = async (req, res) => {
    try {
        const data = await ProductionSchema.find().sort({ date: -1 });
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}