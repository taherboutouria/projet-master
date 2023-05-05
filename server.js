const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const db = process.env.DB_CONNECT;
const userRoute = require('./Routes/users')
const carsRoute = require('./Routes/Cars')
const fileUpload = require('express-fileupload')



app.use(express.json())
app.use(fileUpload({
  useTempFiles : true,
}));
app.use('/api/users', userRoute)
app.use('/api/Cars',carsRoute)

mongoose.set('strictQuery', true)



mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}..`));
