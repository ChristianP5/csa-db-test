const mongoose = require('mongoose');
const Forms = require('../models/Forms');


const getFormById = async (id) => {
    mongoose.connect(process.env.MONGODB_URL);

    const form = await Forms.find( {_id: id} );
    return form[0];
}

module.exports = getFormById;