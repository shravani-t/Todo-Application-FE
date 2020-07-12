import axios from 'axios';
import { JPA_API_URL, PAGE_SIZE } from '../../constants';

class TodoDataService {

    retrieveAllTodos(name, pageNumber) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos?page=${pageNumber}&size=${PAGE_SIZE}`);
    }

    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    }
}

export default new TodoDataService(); 