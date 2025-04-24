import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    type: {
        type: String,
        enum: ['raw', 'finished'],
        required: true // ✅ fixed typo
    },
    itemName: {
        type: String // ✅ fixed type
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String,
        enum: ['kg', 'pieces'],
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String
    }
});

// ✅ This creates the model properly
const InventoryModel = mongoose.model('Inventory', InventorySchema);
export default InventoryModel;
