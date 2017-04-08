//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//in MongoDB you dont have to create DB first
//like here we didnt create TodoApp DB but mentioned
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos')
    //   .deleteMany({text: 'Eat lunch'})
    //   .then((result) => {
    //
    //         console.log(result);
    //
    //   });


    // deleteOne
    // db.collection('Todos')
    //   .deleteOne({text: 'Go out for shopping'})
    //   .then((result) =>{
    //       console.log(result);
    //   });


    // findOneAndDelete -this useful method
    db.collection('Todos')
      .findOneAndDelete({completed:false})
      .then((result) => {
          console.log(result);
      });

    // findOneAndDelete -by _id
    db.collection('Todos')
        .findOneAndDelete({_id: new ObjectID('58e82228d4d7f109ece130b3')});





   // db.close();
});
