import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/DB.js'
import route from './routes/authRoutes.js';
import cors from 'cors'
import productionRoutes from './routes/ProductionRoutes.js'
import Inventoryroutes from './routes/InventoryRoutes.js'
import TruckRoute from './routes/TruckRoutes.js'

dotenv.config();
connectDB();

const app =express();


app.use(express.json());
app.use(cors());
const Port = process.env.PORT || 6000;
app.use("/uploads", express.static("uploads"));
app.use('/api/user',route)

app.use('/api/production', productionRoutes);

app.use('/api/inventory',Inventoryroutes);

app.use ('/api/truck',TruckRoute);

app.listen(Port, () => {
    console.log(`server is running on ${Port}`);
  });