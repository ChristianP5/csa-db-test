const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
    },
    ratings: {
        type: [Number],
    },
    form: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
})

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;