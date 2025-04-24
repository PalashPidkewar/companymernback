
import mongoose from "mongoose";


const Schema = mongoose.Schema;
const TruckModel = new Schema({
    date: {
        type: Date,
        default: Date.now
    }
    ,
    driverName: {
        type: String
    },
    truckNumber: {
        type: String
    },
    emptyWeightKg: {
        type: Number
    },
    loadedWeightKg: {
        type: Number
    },
    bundleCount: {
        type: Number,
        required:true
        
    },
    bundleUnit: {
        type: String,
        enum: ['kg', 'pieces'],
        default: 'pieces'
    },
    itemDescription: {
        type: String,
    },
    dispatchBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    remarks: {
        type: String
    }
})

const TruckSchema = mongoose.model('truck', TruckModel);
export default TruckSchema;