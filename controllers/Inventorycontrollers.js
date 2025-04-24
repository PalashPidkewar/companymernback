import mongoose from "mongoose";
import InventorySchema from "../models/Inventory.js";

export const addInventory = async (req, res) => {
    try {
        const { type, itemName, quantity, unit, remarks } = req.body;

        const newItem = await InventorySchema.create({
            type,
            itemName,
            quantity,
            unit,
            remarks,
            addedBy: req.user.id,
        });

        newItem.save();
        res.status(201).json({ message: 'Inventory item added', data: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// export const getInventor = async (req, res) => {

//     try {
//         const data = await InventorySchema.find().sort({ date: -1 });
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
export const getInventor = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      let filter = {};
  
      if (startDate && endDate) {
        filter.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
  
      const data = await InventorySchema.find(filter).sort({ date: -1 });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };







    export const getInventory = async (req, res) => {
        try {

        } catch (error) {

        }
    }