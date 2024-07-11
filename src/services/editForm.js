const mongoose = require('mongoose');
const Forms = require('../models/Forms');

const editForm = async (id, name, questions) => {
    mongoose.connect(process.env.MONGODB_URL);

    try{
        const result = await Forms.findById(id);
        result.name = name;
        result.questions = questions;
        await result.save();
    }catch(error){
        throw new Error('Something went wrong when Updating the Forms');
    }
}

module.exports = editForm;