export interface ToDoRequestProps {
  _limit: string;
}

export interface ToDoResponseProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PostRequestProps {
  _limit: string;
}

export interface PostsResponseProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}
