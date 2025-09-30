import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes.js';

const app = express();

// Middleware setup
app.use(cors());
app.use('/api/users', userRoutes);
app.use(bodyParser.json());
dotenv.config();

app.get('/v1/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;