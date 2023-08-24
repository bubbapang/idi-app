import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ordersRouter from './routes.js';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Create the Express server
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Welcome message for the root route
app.get('/', (req, res) => {
    res.send('Welcome to the root!');
});

// Use the routes for handling orders
app.use('/orders', ordersRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});