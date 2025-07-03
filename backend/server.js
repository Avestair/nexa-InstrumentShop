const express = require('express');

const connectionDB = require('./config/db');

// Database connection
connectionDB()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Test server'
  });
})


app.listen(process.env.NEXT_PUBLIC_PORT, () => {
  console.log('Server runing on port: 8000, http://localhost:8000');
})
