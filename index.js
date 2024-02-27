const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const PORT = 5000;

const app = express();

const productRoutes = require('./Routes/route');

app.use(express.json());
app.use('/api', productRoutes);

console.log("started");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	app.listen(PORT, () => console.log(`Server PORT ${PORT}`))
    
}).catch((err) => {

    console.error('Error connecting to MongoDB:', err);
})


module.exports = app;