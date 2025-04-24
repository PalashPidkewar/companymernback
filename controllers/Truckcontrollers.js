import TruckSchema from "../models/Truck.js";

export const addTruckdetails = async (req, res) => {
  try {
    const {
      driverName,
      truckNumber,
      emptyWeightKg,
      loadedWeightKg,
      bundleCount,
      bundleUnit,
      itemDescription,
      remarks,
    } = req.body;

    const dispatch = await TruckSchema.create({
      driverName,
      truckNumber,
      emptyWeightKg,
      loadedWeightKg,
      bundleCount,
      bundleUnit,
      itemDescription,
      dispatchBy: req.user.id, // Make sure to use "dispatchBy" (matches schema)
      remarks,
    });

    res.status(201).json({ message: "Dispatch recorded", data: dispatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTruckdetails = async (req, res) => {
  try {
    const records = await TruckSchema.find().sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
