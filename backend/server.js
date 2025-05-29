const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Test server'
  });
})


app.listen(8000, () => {
  console.log('Server runing on port: 8000, http://localhost:8000');
})
