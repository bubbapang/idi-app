import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    company: String,
    address: String,
    orderingPerson: String,
    items: String,
    orderDate: Date,
    shippedDate: Date
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
