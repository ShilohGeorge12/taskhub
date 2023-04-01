import { model, Schema } from "mongoose";

export interface Iuser {
  username: string,
  email: string,
  password: string,
  key: string,
}

const User = model<Iuser>('users', new Schema<Iuser>({
  username: {
    type: String, 
    minlength: 2,
    required: true,
  },
  email: {
    type: String, 
    minlength: 20,
    maxlength: 40,
    required: true,
  },
  password: {
    type: String, 
    minlength: 20,
    maxlength: 1024,
    required: true,
  },
  key: {
    type: String, 
    minlength: 20,
    maxlength: 1024,
    required: true,
  }
}))

export default User;