import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import * as actions from '../../actions'
import {connect} from 'react-redux'


class Signin extends Component{

  handleFormSubmit({email, password}){
    console.log(email, password)
    console.log(this.props)
    this.props.signinUser({email, password})
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops</strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  render(){
    const {handleSubmit} = this.props
    
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            className="form-control"
            component="input"
            type="email"
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            className="form-control"
            component="input"
            type="password"
            placeholder="password"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>  
    )
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

export default connect(mapStateToProps, actions)(
    reduxForm({form: 'signin'})(Signin)
  )