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
            targetDate: moment(new Date()).format('MM-DD-YYYY'),

        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }
    
    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();
        const { id } = this.state;
        const {history} = this.props;
        const {description, targetDate } = values;

        let todo = {
            id: id,
            description: description,
            targetDate: moment(targetDate).format(),
        }
        if(id === -1) {
            TodoDataService.createTodo(username, todo)
            .then( () => history.push('/todos') )
        } else {
            TodoDataService.updateTodo(username, id, todo)
            .then( () => history.push('/todos') )
        }
        console.log(values);
    }

    validate(values) {
        let errors = {}
        const {description, targetDate } = values;

        if(!description) {
            errors.description = 'Enter a description';
        } else if(description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in description';
        }

        if(!moment(targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date';
        }
        return errors;
    }

    componentDidMount() {
        const { id } = this.state

        if(id === -1) {
            return;
        }

        //const currentTimeZone = moment.tz.guess();
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, id)
        .then( response => {
            const { description, targetDate } = response.data

            this.setState({ 
                description: description,
                targetDate: moment(targetDate).format('MM-DD-YYYY'),
            }) 
        })
    }

    render() {
        const { description, targetDate } = this.state;
        const { onSubmit, validate } = this;
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description,
                            targetDate,
                        }}
                        onSubmit={onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate= {validate}
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