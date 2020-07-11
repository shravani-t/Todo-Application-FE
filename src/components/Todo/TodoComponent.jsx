import React, {Component} from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),

        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }
    
    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: moment(values.targetDate).format(),
        }
        if(this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
            .then( () => this.props.history.push('/todos') )
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
            .then( () => this.props.history.push('/todos') )
        }
        console.log(values);
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a description';
        } else if(values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in description';
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date';
        }
        return errors;
    }

    componentDidMount() {
        if(this.state.id === -1) {
            return;
        }

        //const currentTimeZone = moment.tz.guess();
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.state.id)
        .then( response => this.setState({ 
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
        }) )
    }

    render() {
        const { description, targetDate } = this.state;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description,
                            targetDate,
                        }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate= {this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>

            </div>
        )
    }
}

export default TodoComponent;