import express from 'express';
import Order from './models/order.js';

const router = express.Router();

// CREATE: Add a new order
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newOrder = new Order({ title, content });
    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ: Get all orders
router.get('/', (req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE: Update a order by ID
router.put('/:id', (req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.title = req.body.title;
            order.content = req.body.content;
            order.save()
                .then(() => res.json('Order updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE: Delete a order by ID
router.delete('/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;
