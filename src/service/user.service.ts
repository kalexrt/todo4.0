import bcrypt from "bcrypt";
import { getUserQuery, User } from "../interfaces/user.interface";
import * as taskModel from "../model/task.model"
import * as userModel from "../model/user.model";
import loggerWithNameSpace from "../utils/logger";
import { ClientError } from "../error/ClientError";

const logger = loggerWithNameSpace("UserService");

// get a user by their ID
export function getUserById(id: number) {
  logger.info("Called getUserById");
  const data = userModel.getUserById(id);
  if (!data) {
    throw new ClientError("User with this Id does not exist")
  }
  return data;
}

// create a new user with a hashed password
export async function createUser(user: User) {
  logger.info("Called createUser");
  const password = await bcrypt.hash(user.password, 10);
  userModel.createUser({
    ...user,
    password,
  });
}

// get users based on a query
export function getUsers(query: getUserQuery) {
  logger.info("Called getUsers");
  return userModel.getUsers(query);
}

// get a user by their email
export function getUserByEmail(email: string) {
  logger.info("Called getUserByEmail");
  const data = userModel.getUserByEmail(email);
  if(!data){
    throw new ClientError("User with this email does not exist")
  }
  return data;
}

// delete a user by their ID, including all their tasks
export function deleteUserById(id:number){
  logger.info("Called deleteUserById");
  const taskDeletionResult = taskModel.deleteAllTasksByUserId(id); //delete all user tasks
  const userDeletionResult = userModel.deleteUserById(id); //delete user
  
  return {
    taskDeletionResult,
    userDeletionResult,
  };
}

// update user information by their ID
export function updateUserById(id: number, updatedUserData: Partial<User>): User {
  logger.info("Called updateUserById");
  return userModel.updateUserById(String(id), updatedUserData);
}