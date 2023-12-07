const Mongoose = require('mongoose');

const establishConnection = async () => {
    try {
        const connection = await Mongoose.connect(process.env.MONGO_URL);
        console.log('Connection done to db');
    } catch (error) {
        console.log('Not Connected to db');
    }
}

module.exports = establishConnection;
