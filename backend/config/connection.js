const mongoose = require('mongoose')

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_CONNECTION)
        console.log("MongoDB connected:", mongoose.connection.host)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connection