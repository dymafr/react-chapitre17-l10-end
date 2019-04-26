import React, { Fragment } from 'react';

class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      todo: { ...this.props.todo, newname: this.props.todo.name }
    }
  }

  toggleTodo = () => {
    const todo = { ...this.state.todo };
    todo.done = !todo.done;
    this.props.tryEditTodo({ ...todo });
    this.setState({
      todo: {
        ...todo        
      }
    });
  }

  render() {
    const { deleteTodo, tryEditTodo } = this.props;
    const { todo } = this.state;
    return (
      <li  className="list-group-item d-flex flex-row justify-content-between align-items-center" >
        { this.state.edit ? (
          <input value={ todo.newname } type="text" onChange={ (e) => {
            this.setState({ todo: { 
              ...todo,
              newname: e.target.value
            }})
          } } className="form-control" />
        ) : (
          <span> { todo.name } </span>
        )}
        { this.state.edit ? ( 
          <Fragment>
            <button className="btn btn-sm btn-secondary mx-3" onClick={ () => tryEditTodo({ ...todo }) } >Sauvegarder</button>
            <button className="btn btn-sm btn-secondary" onClick={ () => {
              this.setState({ edit: false, todo: { ...todo, newname: todo.name } })
            }}>Annuler</button>
          </Fragment>
        ) : (
          <span>
            <input className="mx-3" checked={ this.state.todo.done } onChange={ this.toggleTodo } type="checkbox" />
            <button onClick={ (e) => {
              e.stopPropagation();
              deleteTodo();
            }} className="btn btn-sm btn-danger mx-3">delete</button>
            <button onClick={ (e) => {
              e.stopPropagation();
              this.setState({ edit: true })
            }} className="btn btn-sm btn-primary">Edit</button>
          </span>
        )}
      </li>
    )
  }
}

export default TodoItem;