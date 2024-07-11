const mongoose = require('mongoose');
const Forms = require('../models/Forms');

const saveForms = async (name, questions) => {
    mongoose.connect(process.env.MONGODB_URL);

    try{
        const result = await Forms.create( { name: name, questions: questions });
    }catch(error){
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = saveForms;