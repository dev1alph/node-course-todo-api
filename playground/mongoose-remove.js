const {ObjectID} = require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Remove everything - we dont get the docs back which are removed
Todo.remove({}).then((result) => {
    console.log(result);
});



//Remove one - we get document back which was deleted
Todo.findOneAndRemove({_id: '58e8528a3503921664241818'}).then((todo) => {
    console.log(todo, ' has been deleted');
});



//Remove one By Id - we get document back which was deleted
Todo.findByIdAndRemove('58e8528a3503921664241818').the((todo) => {
    console.log(todo, ' has been deleted');
});