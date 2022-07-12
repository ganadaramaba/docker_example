
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    "string": {type: String, required: true},
    "number": {type: Number, required: true}
});

const logDocument = mongoose.model('log', logSchema);

module.exports = logDocument;