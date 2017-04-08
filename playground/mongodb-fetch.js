//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//in MongoDB you dont have to create DB first
//like here we didnt create TodoApp DB but mentioned
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos')
    //   .find({
    //      _id: new ObjectID('58e7ddbf6c223f004cb8b4f2')
    //   })
    //   .toArray()
    //   .then((docs) => {
    //    console.log('Todos');
    //    console.log(JSON.stringify(docs, undefined, 2));
    //
    // }, (err) => {
    //    console.log('Unable to fetch todos', err);
    // });

    db.collection('Todos')
        .find()
        .count()
        .then((count) => {
            console.log(`Todos count: ${count}`);

        }, (err) => {
            console.log('Unable to fetch todos', err);
        });


    //db.close();
});
