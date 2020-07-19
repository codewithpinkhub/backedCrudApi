// write the userschema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {type: String, required: [true, 'Name is required']},
      email :{ type: String, required: [true, 'Email is required']},
      password :{ type: String, required: [true, 'Password is required']}

    },
    { timestamps: true }
  );
const UserModel = mongoose.model('Users', userSchema);

module.exports = {
    createUser : async(userData) => {
        const user = new UserModel(userData);
        return user.save();
    },
};
