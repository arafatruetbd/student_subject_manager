const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        // required: true
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'subject',
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('student', StudentSchema);
