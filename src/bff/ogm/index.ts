import { add, collection, Ref, remove, subcollection } from "typesaurus";

//type
export type StoreTodo = {
  title: string;
  completed: boolean;
};
export type StoreUser = {
  email: string;
};

// ref
export const users = collection<StoreUser>("users");
export const todos = subcollection<StoreTodo, StoreUser>("todos", users);

// util
export const addTodo = async (userId: string, todo: StoreTodo) => {
  const todoRef = await add(todos(userId), todo);
  return todoRef;
};
export const removeTodo = async (userId: string, todoRef: Ref<StoreTodo>) => {
  await remove(todos(userId), todoRef.id);
};
