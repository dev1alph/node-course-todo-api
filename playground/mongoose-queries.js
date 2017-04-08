const {ObjectID} = require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58e8470109ecea0b7060d8b1';

if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}


//find() - return array
Todo.find({
   _id: id
}).then((todos) => {  //return array todos
   console.log('Todos: ', todos);
});

//findOne() - return signle document
Todo.findOne({
    _id: id
}).then((todo) => {    // return only single document not array like above
   console.log('Todo: ', todo);
});

//findById() - return single document
Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by Id:', todo);
}).catch((e) => console.log(e));




User.findById('58e84bcc48487a0efc17a60c').then((user) => {
   if(!user){
      return console.log('Unable to find user');
   }

   console.log(JSON.stringify(user, undefined, 2));

}, (e) => {
    console.log(e);
});