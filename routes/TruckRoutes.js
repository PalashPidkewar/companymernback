import { addTruckdetails } from "../controllers/Truckcontrollers.js";
import { getTruckdetails } from "../controllers/Truckcontrollers.js";
import express from 'express';
import { protect, adminOnly } from "../middleware/authmiddleware.js";
const route = express.Router();

route.post('/add',protect,adminOnly,addTruckdetails);
route.get('/get',protect,getTruckdetails);

export default route