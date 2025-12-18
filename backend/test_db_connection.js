const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gym_tracker';

console.log(`Attempting to connect to: ${uri}`);

mongoose.connect(uri)
    .then(() => {
        console.log('Successfully connected to the database!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Failed to connect to the database.');
        console.error(err);
        process.exit(1);
    });
