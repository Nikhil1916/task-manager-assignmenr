import mongoose, { Schema, model, Document } from "mongoose";
import Joi from "joi";

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

const userSchema = new Schema<IUser>(
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

const User = mongoose.model("User", userSchema);
export default User;
