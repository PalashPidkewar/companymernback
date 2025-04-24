// import { date, required } from "joi";
import mongoose from "mongoose";


const Schema = mongoose.Schema;

const ProductionModel = new Schema({
    date:{
        type:Date,
        default:Date.now
    },
    shift:{
        type:String,
        enum:['morning','eveing','night'],
    },
    operatorName:{
        type:String,
        required: true,
        trim: true,
    },
    bundleCount:{
        type:Number,
        required:true,
        min: 0,
    },
    totalWeightKg:{
        type:Number,
        required: true,
        min: 0,
    },
    remarks:{
        type:String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
   },


});
const ProductionSchema =    mongoose.model('Production', ProductionModel);
export default ProductionSchema;