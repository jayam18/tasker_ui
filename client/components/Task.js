/* eslint-disable react/prop-types, react/no-string-refs, max-len */
import React from 'react';
import axios from 'axios';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    // const authorization = `JWT ${localStorage.getItem('token')}`;
    // this.state = { pokemon: [], authorization };
    this.state = { tasks: [] };
  }

  componentWillMount() {
    // axios.get('http://localhost:9001/api/tasks', { headers: { authorization: this.state.authorization } })
    axios.get('http://localhost:9001/api/tasks', { headers: { authorization: this.state.authorization } })
    .then((rsp) => {
      console.log('rsp:', rsp.data);
      this.setState({ tasks: rsp.data.content });
    });
  }

  create(e) {
    e.preventDefault();
    const name = this.refs.name.value; // this.refs.name.value;
    const category = this.refs.category.value;
    const due = this.refs.due.value;
    // axios.post('/api/tasks', { name, category, due }, { headers: { authorization: this.state.authorization } })
    axios.post('http://localhost:9001/api/tasks', { name, category, due })
    .then((rsp) => {
      console.log('rsp:', rsp.data);
      this.setState({ tasks: [...this.state.tasks, rsp.data] });
    });
  }

  delete(e) {
    // e.preventDefault();
    console.log('Event data:', e);
    const taskid = e.currentTarget.getAttribute('data-id');
    console.log('TaskID:', taskid);
    axios.delete(`http://localhost:9001/api/tasks/${taskid}`)
    .then((rsp) => {
      console.log('rsp:', rsp);
      console.log('State:', this.state.tasks);

      const newTasks = this.state.tasks.filter(t => t.id !== taskid);
      console.log('newTasks:', newTasks);
      this.setState({ tasks: newTasks });
      console.log('AfterState:', this.state.tasks);
    });
  }

  render() {
    return (
      <div>

        <h1>Task</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref="name" type="text" className="form-control" id="name" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input ref="category" type="text" className="form-control" id="category" />
              </div>
              <div className="form-group">
                <label htmlFor="due">Due Date</label>
                <input ref="due" type="date" className="form-control" id="due" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9" />
        </div>

        <div className="row">
          <div className="col-xs-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Delete task</th>
                  <th>Task</th>
                  <th>Category</th>
                  <th>Due Date</th>
                  <th>Completed</th>
                  <th>Created Date</th>
                  <th>Updated Date</th>
                </tr>
              </thead>
              <tbody>

                {this.state.tasks.map(t => (
                  <tr key={t.id}>
                    <td><button onClick={this.delete} data-id={t.id} type="submit" className="btn btn-default">Delete</button></td>
                    <td>{t.name}</td>
                    <td>{t.category}</td>
                    <td>{t.due}</td>
                    <td>{t.isComplete}</td>
                    <td>{t.createdDt}</td>
                    <td>{t.updatedDt}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
          <div className="col-xs-9" />
        </div>

      </div>
    );
  }
}
