import { configureChannel } from './channel';

let socket = configureChannel();
let channel = socket.channel('todos');

/*
 * action types
 */

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action creators
 */

function fetchTodosRequest() {
  return { type: FETCH_TODOS_REQUEST };
}

function fetchTodosSuccess(todos) {
  return { type: FETCH_TODOS_SUCCESS, todos };
}

function fetchTodosFailure(error) {
  return { type: FETCH_TODOS_FAILURE, error };
}

function addTodoRequest(text) {
  return { type: ADD_TODO_REQUEST, text };
}

function addTodoSuccess(text) {
  return { type: ADD_TODO_SUCCESS, text };
}

function addTodoFailure(text, error) {
  return { type: ADD_TODO_FAILURE, text, error };
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
