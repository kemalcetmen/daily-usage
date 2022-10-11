import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    ownerId:{
        type:String,
        required:true
    },
    friendName:{
        type:String,
        required:true
    },
    friendAddress:{
        type:String,
        required:true
    },
})

export default mongoose.models.Friend || mongoose.model('Friend',friendSchema)
