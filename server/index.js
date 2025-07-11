
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log('Server running'));
