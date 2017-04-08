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
    //     .findOneAndUpdate({
    //         _id: new ObjectID('58e7ed79388529762e078e92')
    //     }, {
    //         $set:{                //https://docs.mongodb.com/manual/reference/operator/update/
    //             completed :true
    //         }
    //     }, {
    //         returnOriginal: false //When false, returns the updated document rather than the original. The default is true.
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     });


    db.collection('Users')
        .findOneAndUpdate({
            _id: new ObjectID('58e82239685a710b4024e6f5')
        }, {
            $set:{                //https://docs.mongodb.com/manual/reference/operator/update/
                name : 'Chris'
            },
            $inc:{
                age:1
            }
        }, {
            returnOriginal: false //When false, returns the updated document rather than the original. The default is true.
        })
        .then((result) => {
            console.log(result);
        });

   // db.close();
});

