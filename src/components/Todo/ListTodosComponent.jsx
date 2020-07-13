import React, {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment-timezone';
import Pagination from 'react-js-pagination';

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: null,
            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: 0,
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        const { activePage } = this.state;

        TodoDataService.retrieveAllTodos(username, activePage)
        .then(
            response => {
                const { content, totalPages, totalElements, size } = response.data;
                this.setState({ 
                    todos: content,
                    totalPages: totalPages,
                    totalItemsCount: totalElements,
                    itemsCountPerPage: size,
                 })
            }
        )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState(
                    { message: `delete of Todo ${id} successful`}, 
                    () => this.refreshTodos()
                );
            }
        )

    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked() {
        this.props.history.push('/todos/-1');
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber}, () => this.refreshTodos());
    }

    render() {
        const { 
            message, 
            todos, 
            activePage, 
            itemsCountPerPage, 
            totalItemsCount 
        } = this.state

        const {
            updateTodoClicked,
            deleteTodoClicked,
            addTodoClicked,
            handlePageChange
        } = this

        return (
            <div className="h-100">
                <h1>Todos List</h1>
                {message && <div className="alert alert-success">{message}</div>}
                <div className="container h-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed ?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map(
                                    todo => 
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).format('MM-DD-YYYY')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={addTodoClicked}>Add Todo</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            prevPageText='Previous'
                            nextPageText='Next' 
                            firstPageText='First'
                            lastPageText='Last'
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={10}
                            itemClass='page-item'
                            linkClass='page-link'
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent;