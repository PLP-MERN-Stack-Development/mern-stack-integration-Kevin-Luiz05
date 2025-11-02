// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/categories.routes');
const postRoutes = require('./routes/posts.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// serve uploads
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
app.use(`/${UPLOAD_DIR}`, express.static(path.join(__dirname, UPLOAD_DIR)));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();
