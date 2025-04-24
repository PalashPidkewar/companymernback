// import mongoose from "mongoose";



// const Schema = mongoose.Schema;

// const UserModel = new Schema ({
//     name:{
//         type:String
//     },
//     email :{
//         type :String,
//         unique:true,
//         require:true
//     },
//     password:{
//         type:String,
//     },
//     role:{
//         type: String, enum: ['admin', 'employee'], default: 'employee'
//     }

// })

// const UserSchema = mongoose.model('user',UserModel);
// export default UserSchema;
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
  imgpath: {
    type: String,
    required: function() {
      return this.role === 'employee'; // Only required if the role is 'employee'
    },
    validate: {
      validator: function(value) {
        if (this.role === 'employee' && !value) {
          return false; // Prevents saving if the employee photo is missing
        }
        return true;
      },
      message: 'Photo is required for employees.',
    },
  },
});

const UserSchema = mongoose.model('user', UserModel);

export default UserSchema;
