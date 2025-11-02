import mongoose from "mongoose";

const UserShema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String}
})

const user=mongoose.model('UserShema',UserShema)

export default user;