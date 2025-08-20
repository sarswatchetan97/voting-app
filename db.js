const mongoose = require('mongoose');

const dbURL = 'mongodb://127.0.0.1:27017/voting_app'

mongoose.connect(dbURL, {
    useNewURLParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.log('MongoDB Connection Error ', err);
});

db.on('disconnected', () => {
    console.log('MongoDB Server disconnected');
})

module.exports = db;
