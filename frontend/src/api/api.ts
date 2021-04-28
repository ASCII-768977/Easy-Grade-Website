export const apiGetTodoList = (): string => 'http://jsonplaceholder.typicode.com/todos';
export const apiGetOneTodo = (todoId: number): string => `http://jsonplaceholder.typicode.com/todos/${todoId}`;
