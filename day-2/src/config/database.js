const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb://monish:b490zYpDQymuSsBf@ac-qntupdd-shard-00-00.5dgmknu.mongodb.net:27017,ac-qntupdd-shard-00-01.5dgmknu.mongodb.net:27017,ac-qntupdd-shard-00-02.5dgmknu.mongodb.net:27017/?ssl=true&replicaSet=atlas-8yqqt5-shard-0&authSource=admin&appName=Cluster0")
    .then(()=>{
        console.log("connect to database");
    })
}

module.exports = connectToDb