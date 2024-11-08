const {MongoClient} = require("mongodb")
async function getDb() {
    const mongoURL="mongodb://avirana3449:wBnxTbZxPcJrH2zw@cluster0-shard-00-00.lgdme.mongodb.net:27017,cluster0-shard-00-01.lgdme.mongodb.net:27017,cluster0-shard-00-02.lgdme.mongodb.net:27017/?ssl=true&replicaSet=atlas-86k8mb-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(mongoURL);
    return client.db("discord");
    try {
        await client.connect()
    } catch (e) {
        console.log(e);
        
    }
}

module.exports = getDb;