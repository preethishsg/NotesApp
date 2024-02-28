const mongoose = require("mongoose")
const { config } = require("./config")
const connection = mongoose.connect(config.mongoUrl);

// mongoose.set('useFindAndModify', false)

module.exports = {
    connection,
};

