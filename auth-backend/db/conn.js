const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Auth')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
