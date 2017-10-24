import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form'
import * as actions from '../../actions'
import {connect} from 'react-redux'

class Signup extends Component {

  renderField({input, label, type, meta: { asyncValidating, touched, error }}){
    return (
      <div>
       <input {...input} type={type} placeholder={label} className="form-control" />
          {touched && error && <span className="error">{error}</span>}
      </div>    
    )
  }

  handleFormSubmit(formProps){
    console.log(formProps)
    this.props.signupUser(formProps)
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danager">
          <strong>Oopps!</strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const {handleSubmit} = this.props
    
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field 
            type="input" 
            name="email"
            component={this.renderField}
            placeholder="email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field 
            type="input" 
            name="password"
            component={this.renderField}
            className="form-control"
            placeholder="password"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field 
            type="input" 
            name="passwordConfirm"
            component={this.renderField}
            className="form-control"
            placeholder="confirm password"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps){
  const error = {}
  if(!formProps.email){
    error.email = 'Please enter an email'
  }

  if(!formProps.password){
    error.password='Please enter password'
  }

  if(!formProps.passwordConfirm){
    error.passwordConfirm='Please enter a password confirmatoin'
  }

  if(formProps.password !== formProps.passwordConfirm){
    error.password = 'Passwords must match!'
  }

  return error
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

export default connect(mapStateToProps, actions)(
  reduxForm({form: 'signup', validate: validate})(Signup)
  )
