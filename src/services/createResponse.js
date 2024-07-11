const mongoose = require('mongoose');
const Response = require('../models/Response');

const createResponse = async (formId, department, ratings) => {
    mongoose.connect(process.env.MONGODB_URL);

    try{
        const result = await Response.create( { form: formId, department: department, ratings: ratings });
    }catch(error){
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = createResponse;