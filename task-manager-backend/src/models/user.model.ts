// https://chatgpt.com/c/68d55b0d-4750-8332-b4c2-0e8cb218cf13
import mongoose, { Schema, model, Document, Model } from "mongoose";
import Joi from "joi";
import bcrypt from 'bcrypt';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  is_deleted: boolean;
  previous_password: [string];
  is_verified: boolean;
  age: Number;
  gender: string;
}

interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => {
          const emailJoiSchema = Joi.string().email().required();
          const { error } = emailJoiSchema.validate(value);
          return !error;
        },
        message: "Invalid Email Format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          const passwordJoiSchema = Joi.string()
            .min(8)
            .pattern(/[0-9]/, "number")
            .pattern(/[a-z]/, "uppercase")
            .pattern(/[A-Z]/, "lowercase")
            .pattern(/[@$!%*?&]/, "special")
            .required();
          const { error } = passwordJoiSchema.validate(value);
          return !error;
        },
        message:
          "Password must be at least 8 chars, with uppercase, lowercase, number & special character",
      },
    },
    previous_password: {
      type: [String],
    },
    age: {
      type: "number",
    },
    gender: {
      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is incorrect gender type`,
      },
    },
    is_deleted: {
      type: Boolean,
    },
    is_verified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next){
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function(password:string) {
  return bcrypt.compare(password, this.password);
} 

const User = mongoose.model<IUser, UserModel>("User", userSchema);
export default User;
