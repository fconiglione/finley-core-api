import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.get('/status', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;