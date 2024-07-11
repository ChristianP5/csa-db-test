const mongoose = require('mongoose');
const Response = require('../models/Response');


const getResponsesByFormId = async (formId) => {
    mongoose.connect(process.env.MONGODB_URL);

    const responses = await Response.find( {form: formId} ).sort({ createdAt: -1 });
    return responses;
}

module.exports = getResponsesByFormId;