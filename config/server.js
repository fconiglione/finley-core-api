import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes.js';
import { initializeUserTable } from '../db/initialize.js';
import { verifyUser } from '../controllers/userController.js';

const app = express();

// Middleware setup
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
dotenv.config();
initializeUserTable();

app.use('/v1/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;