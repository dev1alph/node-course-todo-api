const MongoClient = require('mongodb').MongoClient;

// ES6 Object destruction

// var user = {name: 'Andrew', age: 25};
// var {name} = user;
// console.log(name);

//ES6 Object destruction to get the Mongo _id in order to
//  to customise it which isn't recommended since
//  MongoDB doing good job creating unique _ids

// const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

//in MongoDB you dont have to create DB first
//like here we didnt create TodoApp DB but mentioned
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');

    //MongoDB Insert in Todos table/collection
    db.collection('Todos').insertOne({ //collection meaning table in NoSQL
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    //MongoDB Insert
    db.collection('Users').insertOne({
        name : 'Moore',
        age: 19,
        location: 'New York, USA'
    }, (err, result) =>{
        if(err){
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});

