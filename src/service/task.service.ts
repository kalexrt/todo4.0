import {
  createTaskInDB,
  deleteTaskByIdFromDB,
  getTaskByIdFromDB,
  getTasksFromDB,
  updateTaskInDB,
} from "../model/task.model";
import { ITask } from "../interfaces/ITask.interface";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskService")

//get tasks
export function getTasks(userId: number) {
  logger.info("Called getTasks")
  return getTasksFromDB(userId);
}

//get task by id
export function getTaskById(id: number, userId: number) {
  logger.info("Called getTaskById")
  return getTaskByIdFromDB(id, userId);
}

//delete task
export function deleteTaskById(id: number, userId: number) {
  logger.info("Called deleteTaskByid")
  deleteTaskByIdFromDB(id, userId);
}

//create task
export function createTask(task: ITask, userId: number) {
  logger.info("Called createTask")
  const taskWithUserId = { ...task, userId }; //add userId to the task
  createTaskInDB(taskWithUserId);
}

//update task
export function updateTaskById(id: number, task: ITask, userId: number) {
  logger.info("Called updateTaskById")
  updateTaskInDB(id, task, userId);
}
