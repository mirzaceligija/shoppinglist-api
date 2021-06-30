import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  return await User.create(input);
}
  
export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export function findAndUpdate(
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions
  ) {
    return User.findOneAndUpdate(query, update, options).exec(function(err, data) {
      data?.save();
    });
  }
  
export async function validatePassword({
    email,
    password,
} : {
    email: UserDocument["email"];
    password: string;
}) {
    const user = await User.findOne({ email });

    if (!user) {
    return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
    return false;
    }

    return omit(user.toJSON(), "password");
}