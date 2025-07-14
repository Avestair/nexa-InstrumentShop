const express = require('express');

const connectionDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const setupSwagger = require('./config/swagger');
const path = require('path');

// Database connection
connectionDB()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Swagger config
setupSwagger(app);



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);


app.listen(process.env.NEXT_PUBLIC_PORT, () => {
  console.log('Server runing on port: 8000, http://localhost:8000');
})
