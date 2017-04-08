const MongoClient = require('mongodb').MongoClient;

//in MongoDB you dont have to create DB first
//like here we didnt create TodoApp DB but mentioned
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');


    db.close();
});

