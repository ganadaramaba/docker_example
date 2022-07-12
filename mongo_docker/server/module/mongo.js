
const mongoose = require('mongoose');
const schema = require('../schema/mongoSchema');

const writeLog = async (string, number) => {

    await mongoose.connect("mongodb://admin:password@mongo");

    const log = new schema({
        string: string,
        number: number
    });
    const result = await log.save();

    await mongoose.disconnect();
    
    return result;
}

const getLog = async () => {

    await mongoose.connect("mongodb://admin:password@mongo");

    const result = await mongoose.model('log').find({});

    await mongoose.disconnect();
    
    return result;
}

module.exports = {
    writeLog,
    getLog
}