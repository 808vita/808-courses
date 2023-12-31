import { Document, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export interface IUserDocument extends Document {
  email: string;
  role: string;
  password: string;
}

export interface IUserModel extends Model<IUserDocument> {
  signup(email: string, password: string, role: string): any;
  login(email: string, password: string): any;
}

const roles: string[] = ["student", "instructor", "admin"]

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      // select: false, //dont send this
    },
    role: {
      type: String,
      default: "student",
      enum: {
        values: roles,
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 *
 * @param email
 * @param password
 * @param role
 * @returns user object
 *
 * userschema static method to signup new user (with any role)
 *
 * Also does precautionary validations for sensitive fields
 *
 * Passwords are stored in hashform into the db
 */
UserSchema.statics.signup = async function (
  email: string,
  password: string,
  role: string
) {
  if (!email || !password || !role) {
    throw Error("All fields must be filled with valid details");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!roles.includes(role)) {
    throw Error("Not a valid role");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    role,
  });

  return user;
};

/**
 *
 * @param email
 * @param password
 * @returns user object
 *
 * static method for login
 *
 * also does validation on the server side
 *
 * returns user object on success
 *
 */
UserSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

const User: IUserModel =
  (models.User as IUserModel) ||
  model<IUserDocument, IUserModel>("User", UserSchema);
export default User;
