import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tryAddTodo } from '../store/actions';

class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  submitTodo = () => {
    this.props.tryAddTodo({
      name: this.input.current.value,
      done: false
    })

    this.input.current.value = '';
  }

  render() {
    return (
      <div className="d-flex mb-4">
        <input ref={ this.input } type="text" className="form-control mr-5" />
        <button onClick={ this.submitTodo } className="btn btn-success"> Ajouter </button>
      </div>
    )
  }
 
}

export default connect(null, dispatch => { 
  return { 
    dispatch,
    tryAddTodo: (todo) => dispatch(tryAddTodo(todo)) 
  } 
})(AddTodo);