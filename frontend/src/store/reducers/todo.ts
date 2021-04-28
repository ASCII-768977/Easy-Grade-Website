import {
  CLEAR_ONE_TODO,
  CLEAR_TODO_LIST,
  STORE_DEFAULT_TODO,
  STORE_ONE_TODO,
  STORE_PAGE_TODO_LIST,
  STORE_TODO_LIST,
  STORE_TODO_LIST_LENGTH,
} from '../actions/actionTypes';
import initialSate from '../initialState';
import { Action } from '../../types';

const initialToDoState = initialSate.todo;

const todoReducer = (state = initialToDoState, action: Action) => {
  switch (action.type) {
    case STORE_TODO_LIST:
      return { ...state, todoList: action.payload };
    case STORE_PAGE_TODO_LIST:
      return { ...state, pageTodoList: action.payload };
    case CLEAR_TODO_LIST:
      return { ...state, todoList: [], pageTodoList: [] };
    case STORE_TODO_LIST_LENGTH:
      return { ...state, todoListLength: action.payload };
    case STORE_ONE_TODO:
      return { ...state, oneTodo: action.payload };
    case CLEAR_ONE_TODO:
      return { ...state, oneTodo: {} };
    case STORE_DEFAULT_TODO:
      return { ...state, defaultTodo: action.payload };
    default:
      return state;
  }
};

export default todoReducer;
