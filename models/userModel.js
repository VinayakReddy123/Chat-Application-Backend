import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
      name: { type: "String", required: true },
      email: { type: "String", unique: true, required: true },
      password: { type: "String", required: true },
      pic: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestaps: true }
  );


userSchema.methods.matchPassword=async function(enteredPwd){
   return await bcrypt.compare(enteredPwd, this.password);
}

userSchema.pre('save',async function(next){
   if(!this.isModified){
     next();
   }
   const salt=await bcrypt.genSalt(10);
   this.password= await bcrypt.hash(this.password,salt);
   next();
})

const User=new mongoose.model("User",userSchema);
export default User;