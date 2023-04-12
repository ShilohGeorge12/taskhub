import { model, Schema } from "mongoose";

export interface Iuser {
  username: string,
  email: string,
  password: string,
  isloggin: boolean,
  image: {
    data: any,
    contentType: string
  },
}

const User = model<Iuser>('users', new Schema<Iuser>({
  username: {
    type: String, 
    minlength: 2,
  },
  email: {
    type: String, 
    minlength: 20,
    maxlength: 40,
  },
  password: {
    type: String, 
    minlength: 20,
    maxlength: 1024,
  },
  isloggin: {
    type: Boolean,
  },
  image: {
    data: Buffer,
    contentType: String
  },
}))

export default User;