import mongoose ,{Schema, models} from "mongoose";
const userSchema= new Schema(
    {
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
        password:{type:
            String,
            required:true
        },
        role:{
            type:String,
            required:true
        },

    }
);

const User= models.User || mongoose.model("User",userSchema);
export default User