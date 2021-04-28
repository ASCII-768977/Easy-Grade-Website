import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './DemoSaga.scss';
import {
  asyncRequestDefaultTodo,
  asyncRequestOneTodo,
  asyncRequestTodoList,
} from '../../store/sagas/actions/asyncActionCreator';
import { Pagination, Button, InputNumber } from 'antd';
import DemoTodoCard from '../../components/DemoTodoCard';
import { clearOneTodo, clearTodoList, storePageTodoList, storeTodoListLength } from '../../store/actions/actionCreator';
import { State } from '../../types/state';
import { demoPageProps, todoList } from '../../types';

const mapStateToProps = (state: State) => ({
  todoList: state.todo.todoList,
  pageTodoList: state.todo.pageTodoList,
  todoListLength: state.todo.todoListLength,
  oneTodo: state.todo.oneTodo,
  defaultQueryId: state.todo.defaultQueryId,
  defaultTodo: state.todo.defaultTodo,
});

const DemoSage = (props: demoPageProps) => {
  const { todoList, pageTodoList, todoListLength, oneTodo, defaultTodo } = props;
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const onGetTodoList = () => {
    dispatch(asyncRequestTodoList());
  };

  const onClearTodoList = () => {
    dispatch(clearTodoList());
  };

  const onChange = (page: number) => {
    setPage(page);
    sliceList(page, todoList);
  };

  const sliceList = (page: number, todoList: todoList) => {
    const slicedList = todoList.slice((page - 1) * pageSize, page * pageSize);
    dispatch(storePageTodoList(slicedList));
  };

  const onShowCompleted = () => {
    setPage(1);
    const filteredList = todoList.filter((item: any) => item.completed);
    sliceList(1, filteredList);
    dispatch(storeTodoListLength(filteredList.length));
  };

  const onShowUncompleted = () => {
    setPage(1);
    const filteredList = todoList.filter((item: any) => !item.completed);
    sliceList(1, filteredList);
    dispatch(storeTodoListLength(filteredList.length));
  };

  const [inputNum, setInputNum] = useState(1);

  const onChangeInputNum = (value: any) => {
    setInputNum(value);
  };

  const onGetOneTodo = () => {
    dispatch(asyncRequestOneTodo(inputNum));
  };

  const onClearOneTodo = () => {
    dispatch(clearOneTodo());
  };

  const onGetDefaultTodo = () => {
    dispatch(asyncRequestDefaultTodo());
  };

  return (
    <div>
      <div className="todo-page">
        <div className="todo-page__container">
          <section>
            <h2>Redux saga demo 1: async request, store and clear state</h2>
            <Button type="primary" onClick={onGetTodoList}>
              Get List
            </Button>
            <Button onClick={onClearTodoList}>Clear List</Button>
            <Button onClick={onShowCompleted}>Show Completed</Button>
            <Button onClick={onShowUncompleted}>Show Uncompleted</Button>
            <div className="todo-cards__container">
              {pageTodoList.map((item: any, key: any) => (
                <DemoTodoCard
                  userId={oneTodo.userId}
                  key={key}
                  id={item.id}
                  title={item.title}
                  completed={item.completed}
                />
              ))}
            </div>
            {pageTodoList.length !== 0 && (
              <Pagination
                current={page}
                onChange={onChange}
                pageSize={pageSize}
                showSizeChanger={false}
                total={todoListLength}
              />
            )}
          </section>
          <section className="one-todo">
            <h2>Redux saga demo 2: async request with variable</h2>
            <span className="hint">Query by Id:</span>
            <InputNumber min={1} max={200} value={inputNum} onChange={onChangeInputNum} />
            <Button onClick={onGetOneTodo}>Get One</Button>
            <Button onClick={onClearOneTodo}>Clear One</Button>
            <div className="todo-cards__container">
              {Object.keys(oneTodo).length !== 0 && (
                <DemoTodoCard
                  userId={oneTodo.userId}
                  id={oneTodo.id}
                  title={oneTodo.title}
                  completed={oneTodo.completed}
                />
              )}
            </div>
          </section>
          <section>
            <h2>Redux saga demo 3: select a store state when sending async request</h2>
            <p>The default query id is 10 in redux store</p>
            <Button onClick={onGetDefaultTodo}>Get Default</Button>
            <div className="todo-cards__container">
              {Object.keys(defaultTodo).length !== 0 && (
                <DemoTodoCard
                  userId={oneTodo.userId}
                  id={defaultTodo.id}
                  title={defaultTodo.title}
                  completed={defaultTodo.completed}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DemoSage);
