import { Schema, model, InferSchemaType } from "mongoose"
import bcrypt from "bcrypt"

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password : string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String
});

userSchema.methods.verifyPassword = async function(password: string){
    return await bcrypt.compare(password, this.password)
}


const UserModel = model<IUser>("Users", userSchema)

export default UserModel;