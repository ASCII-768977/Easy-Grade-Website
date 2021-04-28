export interface todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type todoList = Array<todo>;
