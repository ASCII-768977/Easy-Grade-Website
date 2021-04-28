import { call, put, select } from 'redux-saga/effects';

import { REQUEST_ONE_TODO, REQUEST_TODO_LIST, REQUEST_DEFAULT_TODO } from '../actions/asyncActionTypes';
import { requestOneTodo, requestTodoList } from '../requests/todo';
import {
  storeDefaultTodo,
  storeOneTodo,
  storePageTodoList,
  storeTodoList,
  storeTodoListLength,
} from '../../actions/actionCreator';
import { Action } from '../../../types';
import { State } from '../../../types/state';

export function* asyncHandleTodo(action: Action): any {
  switch (action.type) {
    case REQUEST_TODO_LIST: {
      try {
        const todoListRes = yield call(requestTodoList);
        const todoList = todoListRes.data;
        yield put(storeTodoList(todoList));
        yield put(storePageTodoList(todoList.slice(0, 8)));
        yield put(storeTodoListLength(todoList.length));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case REQUEST_ONE_TODO: {
      try {
        const oneTodoRes = yield call(requestOneTodo, action.payload);
        yield put(storeOneTodo(oneTodoRes.data));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case REQUEST_DEFAULT_TODO: {
      try {
        const defaultQueryId = yield select(selectDefaultTodo);
        const defaultTodoRes = yield call(requestOneTodo, defaultQueryId);
        yield put(storeDefaultTodo(defaultTodoRes.data));
      } catch (err) {
        console.log(err);
      }
      break;
    }

    default:
      return;
  }
}

const selectDefaultTodo = (state: State) => state.todo.defaultQueryId;
