import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    email: String,
    password:   String,
    description: [{ body: String, date: Date }], //bio
    register_date: { type: Date, default: Date.now },
    list_of_followers: String,
    list_of_following: String,
});

const user = mongoose.model('user', userSchema);

// find each user with a last name matching 'Ghost', selecting the `name` and `occupation` fields
user.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, user) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    console.log('%s %s is a %s.', user.name.first, user.name.last,
        user.occupation);
});