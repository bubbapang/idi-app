import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
