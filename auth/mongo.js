const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:root@authtrials.xg2oo.mongodb.net/users').then(() => {
    console.log('Connected to MongoDB for Auth Service');
}).catch((err) => {
    console.log(err);
})


const userSchema = new mongoose.Schema({
    username:{ type: String, required: true },
    Fname: { type: String, required: true },
    Lname: { type: String,required: true  },
    email: { type: String, required: true  },
    password: { type: String, required: true },
    token: { type: String },
    dob: { type: Date }
})

const User = mongoose.model('User', userSchema);

module.exports = User;