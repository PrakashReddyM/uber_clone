const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//route imports
const userR = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

dotenv.config({})

//database connnection
connectDB();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api/auth', userR);


app.listen(port, () => {
    console.log('Server Running...');
})