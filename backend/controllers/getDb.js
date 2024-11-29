const {MongoClient} = require("mongodb")
async function getDb() {
    const mongoURL=process.env.DB_URL;
    const client = new MongoClient(mongoURL);
    try {
        await client.connect()
    } catch (e) {
        console.log(e);
    }
    return client.db("discord");
}

module.exports = getDb;