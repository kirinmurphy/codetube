import { fetchIt } from "./fetchIt";
import { ToDoResponseProps, ToDoRequestProps, PostsResponseProps, PostRequestProps } from "./types";

export async function fetchToDoList (): Promise<ToDoResponseProps[] | undefined> {
  const path = 'https://jsonplaceholder.typicode.com/todos';
  const params = { _limit: '10' }; // Example params

  return await fetchIt<ToDoRequestProps, ToDoResponseProps[]>({ path, params });
};

export async function fetchPosts (): Promise<PostsResponseProps[] | undefined> {
  const path = 'https://jsonplaceholder.typicode.com/posts';
  const params = { _limit: '20' }; // Example params

  return await fetchIt<PostRequestProps, PostsResponseProps[]>({ path, params });
}
