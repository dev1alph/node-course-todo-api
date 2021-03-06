const mongoose  = require('mongoose');
const validator = require('validator');
const jwt        = require('jsonwebtoken');
const _           = require('lodash');
const bcrypt     = require('bcryptjs');

// {
//     email: 'doe@example.com',
//     password: 'myPass123',
//     tokens:[{
//         access: 'auth',
//         token: 'asafjjehwjrhewjriuhwerhiu'
//     }]
// }

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var UserObject = user.toObject();

  return _.pick(UserObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

   user.tokens.push({access, token});
    return user.save().then(() => {
       return token;
   });

};


UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull:{
            tokens :{token}
        }
    })

};



// .statics kind of .methods but anything you add on to it turned out to be
//   model method as oppesed to instance method in .methods
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(e){

        // return new Promise((resolve, reject) =>{
        //    reject();
        // });

        return Promise.reject(); // same as above code but shorter version
    }

    return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,   // ' ' qoutes are required coz we are using dot (.)
       'tokens.access': 'auth'
    });

};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {

        if(!User){
           return Promise.reject();
       }

       return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password
            bcrypt.compare(password, user.password, (err, res) => {
               if(res){
                   resolve(user);
               }else{
                   reject();
               }
            });
       });
    });
};



UserSchema.pre('save', function (next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(user.password, salt, (err, hash) =>{
              user.password = hash;
              next();
           });
        });
    }else{
        next();
    }

});









var User = mongoose.model('User', UserSchema);

module.exports = {User};
