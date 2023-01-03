/* const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true }
});

userSchema.pre('save', function(next){
    if (this.isNew || this.isModified('password')){

        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

userSchema.method.isCorreectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('user', userSchema); */


const { Router } = require('express');
const routes = Router();

routes.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

routes.get('/users/signup', (req, res) => {
    res.render('/users/signup')
});

module.exports = routes;