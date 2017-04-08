require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require ('./models/todo');
var {User} = require ('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());



// INSERT
app.post('/todos', (req, res) => {
    var todo = new Todo({
       text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});




// SELECT *
app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
       res.send({todos});
   }, (e) => {
       res.status(400).send(e);
   });
});




//  SELECT where id = :id
app.get('/todos/:id', (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)){
       return res.status(404).send();
   }

   Todo.findById(id).then((todo) => {
      if(!todo){
          return res.status(404).send();
      }

      res.send({todo});

   }).catch((e) => {
      res.status(400).send();
    });

   //GET :id - res.send(req.params); for debugging, this req.params.id  hold :id
});




// DELETE where id = :id
app.delete('/todos/:id', (req, res) => {//return null if no item is deleted
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
       if(!todo){
           return res.status(404).send();
       }

       res.send(todo);

    }).catch((e) => {
        res.status(400).send();
    });
});




// UPDATE - should use patch route for update *recommended*
app.patch('/todos/:id', (req, res) => {
   var id   = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime(); // Unix timestamp
    }else{
        body.completed   = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
           if(!todo) {
               return res.status(404).send();
           }

           res.send({todo});
       }).catch((e) => {
               res.status(400).send();
         });
});








app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});



module.exports = {app};