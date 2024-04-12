import mongoose,{Schema, models} from "mongoose";
const userSchema= new Schema(
    {
        clerkId:{
            type:String,
            required: true,
            unique:true,
        },
        firstName:{
            type:String,
            required: true
        },
        lastName:{
            type:String,
            required: true
        },
        email:{type:String,
            required:true
        },
        username:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
     
        role:{
            type:String,
            required:true
        },
        hospital:{
            type:String,
        }

    }
);

const User= models.User || mongoose.model("User",userSchema);
export default User