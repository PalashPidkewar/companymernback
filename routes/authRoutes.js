
import express from 'express'
const route = express.Router()
import { register } from "../controllers/authControllers.js";
import { login } from "../controllers/authControllers.js";
import { protect } from '../middleware/authmiddleware.js';
import { adminOnly } from '../middleware/authmiddleware.js';
import { getRegisterUser } from '../controllers/authControllers.js';
import { Updatepassword } from '../controllers/authControllers.js';
import { upload } from '../middleware/multermiddleware.js';
route.post('/register',upload.single('photo'),register);
route.post('/login',login);
route.get('/allusers',protect, adminOnly,getRegisterUser);
route.put('/password',protect,Updatepassword);

export default route;