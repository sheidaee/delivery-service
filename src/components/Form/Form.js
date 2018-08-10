import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Button, Intent } from "@blueprintjs/core";

import TextField from "../UI/TextField";
import TextAreaField from "../UI/TextAreaField";
import { showResults } from "../../utilities";
import GraphApi from "../../utilities/graph"
 
const validate = values => {
  const errors = {}    

  return errors
}

const createRenderer = render => ({ input, meta, label, ...rest }) => {
  return <React.Fragment>
      <label className="pt-label">
        <div className={rest.captionClassName}>
          {label}
        </div>
        <div className={`${rest.dataClassName} pt-form-group pt-intent-danger`}>
          {render(input, label, meta.touched, meta.error, rest.disabled)}
          <div className="pt-form-helper-text">
            {meta.touched ? meta.error : ""}            
          </div>
          <div className="pt-form-comment">            
            {rest.description}
          </div>
        </div>
      </label>
    </React.Fragment>;
}

export const RenderText = createRenderer((input, label, touched, error, disabled) => (
  <TextField {...input} disabled={disabled} />
));

export const RenderTextArea = createRenderer(
  (input, label, touched, error, disabled) => (
    <TextAreaField {...input} disabled={disabled} />
  )
);

export class Form extends Component {
  submitHandler = (values) => {
    const graph = new GraphApi(this.props.gNodes, this.props.gLinks);  
    
    this.props.onSave(values, graph.deliveryCost(values.path)).then( response => {
      this.props.reset();
      return response;
    })      
  }

  render() {
    const { handleSubmit, submitting, reset } = this.props;

    return <form onSubmit={handleSubmit(this.submitHandler)} className="Form">
        <Field 
          name="path" 
          label="Path" 
          component={RenderText} 
          captionClassName="nameCaption" 
          dataClassName="nameData"
          disabled={submitting}
          description="example: A-B-E" />        

        <div className="pt-dialog-footer-actions">
          <div 
            className='pt-spinner pt-small'
            style={{
              display: submitting ? 'block' : 'none'
            }}>
            <div className="pt-spinner-svg-container">
              <svg viewBox="0 0 100 100">
                <path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                <path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
              </svg>
            </div>
          </div>

          <Button 
            text="reset" 
            onClick={reset}
            disabled={submitting} />

          <Button 
            text="Calculate" 
            type="submit" 
            intent={Intent.PRIMARY} 
            disabled={submitting} />                  
        </div>
      </form>;
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {    
    onSave: (formValues, deliveryCost) => {
      console.log('Now running onSave action')            

      return showResults(formValues, deliveryCost);
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps);

Form = reduxForm({
  form: "RegForm",
  initialValues: {
    path: ""    
  },
  validate
})(Form)

Form = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Form)

export default Form
