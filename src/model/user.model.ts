import { getUserQuery, User } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserModel")

let users: User[] = [ 
  {
    id: "1",
    name: "Kalash",
    email: "kalash1@gmail.com",
    password: "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
    permissions:["users.getAll","users.create","users.getById","users.updateById","users.deleteById"],
  },
  {
    id: "2",
    name: "Kalash",
    email: "kalash2@gmail.com",
    password: "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
    permissions:[],
  },
];

//return user by id
export function getUserById(id: number) {
  logger.info("Called getUserById");
  return users.find(( user ) => parseInt(user.id) === id);
}

//create users
export function createUser(user: User) {
  logger.info("Called createUser")
  return users.push({
    ...user,
    id: `${users.length + 1}`,
  });
}

//get all users
export function getUsers(query: getUserQuery) {
  logger.info("Called getUsers")
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name.includes(q));
  }
  return users;
}

//return user by email
export function getUserByEmail(email: string) {
  logger.info("Called getUsersByEmail")
  return users.find(({ email: userEmail }) => userEmail === email);
}

//delete the user by the id
export function deleteUserById(id:number){
  logger.info("Called deleteUserById")
  users = users.filter(user => parseInt(user.id) !== id);
  return {message: `user${id} is delted`}
}

//update the user from the given Id
export function updateUserById(id: string, updatedUserData: Partial<User>): User {
  logger.info("Called updateUserById")
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  //update user data
  users[userIndex] = { ...users[userIndex], ...updatedUserData };
  return users[userIndex];
}