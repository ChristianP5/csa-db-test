const mongoose = require('mongoose');
const Forms = require('../models/Forms');


const getAllForms = async () => {
    mongoose.connect(process.env.MONGODB_URL);

    const forms = await Forms.find().sort( {createdAt: -1} );
    return forms;
}

module.exports = getAllForms;