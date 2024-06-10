//chatname
//isgroupchat
//users list
//lastest message
//group admin 
import mongoose from "mongoose";

const chatModel=mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    idGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Chat=new mongoose.model("Chat",chatModel);
export default Chat;
