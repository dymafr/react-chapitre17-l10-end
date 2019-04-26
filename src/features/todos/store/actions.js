import apiFirebase from '../../../config/api.firebase';

export const DELETE_TODO = 'delete todo';
export const TOGGLE_TODO = 'toggle todo';

export const TRY_ADD_TODO = 'try add todo';
export const ADD_TODO_SUCCESS = 'add todo success';
export const ADD_TODO_ERROR = 'add todo error';

export const REQUEST_TODO = 'request todo';
export const FETCH_TODO = 'fetch todo';
export const FETCH_TODO_SUCCESS = 'fetch todo success';
export const FETCH_TODO_ERROR = 'fetch todo error';

export const EDIT_TODO = 'try edit to do';
export const EDIT_TODO_SUCCESS = 'edit to do success';
export const EDIT_TODO_ERROR = 'edit to do error';

export const tryAddTodo = (todo) => {
  return (dispatch, getState) => {
    const todos = [ ...getState().todos.data ];
    return apiFirebase.put('todos.json', todos).then(
      response => dispatch(addTodoSuccess(todo)),
      error => dispatch(addTodoError(error))
    )
  }
}

export const addTodoSuccess = (todo) => {
  return {
    type: ADD_TODO_SUCCESS,
    todo
  }
}

export const addTodoError = (error) => {
  return {
    type: ADD_TODO_ERROR,
    error
  }
} 

export const tryEditTodo = (todo) => {
  return (dispatch, getState) => {
    const todos = [ ...getState().todos.data.map( t => {
      if (t.name === todo.name) {
        return {
          name: todo.newname,
          done: todo.done
        }
      } else {
        return t;
      }
    })];
    return apiFirebase.put('todos.json', todos).then(
      response => dispatch(editTodoSuccess(response.data)),
      error => dispatch(editTodoError(error))
    )
  }
}

export const editTodoSuccess = (todos) => {
  return {
    type: EDIT_TODO_SUCCESS,
    todos
  }
}

export const editTodoError = (error) => {
  return {
    type: EDIT_TODO_ERROR,
    error
  }
} 

export const deleteTodo = (index) => {
  return {
    type: DELETE_TODO,
    index
  }
}

export const toggleTodo = (index) => {
  return {
    type: TOGGLE_TODO,
    index
  }
}

export const requestTodo = () => {
  return {
    type: REQUEST_TODO
  }
}

export const fetchTodoSuccess = (todos) => {
  return {
    type: FETCH_TODO_SUCCESS,
    todos
  }
}

export const fetchTodoError = (error) => {
  return {
    type: FETCH_TODO_ERROR,
    error
  }
}

export const fetchTodo = () => {
  return (dispatch) => {
    dispatch(requestTodo());
    return apiFirebase.get('todos.json').then(
      (response) => {
        const data = response.data;
        dispatch(fetchTodoSuccess(data));
      },
      (error) => {
        dispatch(fetchTodoError(error));
      }
    )
  }
}


