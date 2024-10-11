const {MongoClient} = require("mongodb")
async function getDb(mongoURL, collectionName) {
    const client = new MongoClient(mongoURL);
    return client.db("discord");
    try {
        await client.connect()
    } catch (e) {
        console.log(e);
        
    }
}

module.exports = getDb;