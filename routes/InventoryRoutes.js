import { addInventory } from "../controllers/Inventorycontrollers.js";
import { getInventor } from "../controllers/Inventorycontrollers.js";
import { protect,adminOnly } from "../middleware/authmiddleware.js";
import express from 'express'
const routes = express.Router();

routes.post('/add', protect, adminOnly,addInventory);
routes.get('/get',protect,getInventor)

export default routes;
