import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

import styles from './form.scss';

// helper function to create a unique reference key based on element ID
const uniqueRef = (id) => `SET_${id}Ref`;

class Form extends Component {
  state = {
    status: 'invalid'
  }

  constructor(props) {
    super(props);
    // Create an array of all nodes that require validation
    this.nodesToValidate = [ ...this.getNodes(this.props.children) ];

    // Loop through and create unique refs for each based on ID
    this.nodesToValidate.forEach((node) => {
      const uniqueRefName = uniqueRef(node.props.id);
      this[uniqueRefName] = (el) => this[node.props.id] = el;
    });
  }

  // Set refs for cloned elements and reset original ref if it exists
  createCtxRef = (id, originalRef) => {
    return ((...args) => {
      this[uniqueRef(id)](args[0]);
      
      if (originalRef) {
        originalRef.apply(null, args);
      }
    })
  }

  // Check state of all "nodesToValidate" then setState with status
  // onValidate will just return status to parent if needed
  validateGroup = () => {
    setTimeout(() => {
      const status = this.nodesToValidate.every((node) => {
        return this[node.props.id].state.status === 'valid';
      }) ? 'valid' : 'invalid';
      
      this.setState({ status })
      
      if (this.props.onValidate) {
        this.props.onValidate(status);
      }
    });
  }

  getNodes = (children) => {
    const shouldValidate = ({ validation }) => !!validation;
    
    return Children.map(children, (child) => {
      if (!child.props) return;
      
      if (child.props.children) {
        return this.getNodes(child.props.children);
      }

      return child;

    }).filter(node => shouldValidate(node.props));
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ status: 'processing' });

    this.props.onSubmit(e)
      .then(() => this.setState({ status: 'processed' }))
      .catch(() => this.setState({ status: 'valid' }));
  }
  
  setRef = (originalRef, { id, validation }) => {
    return validation
      ? this.createCtxRef(id, originalRef)
      : originalRef;
  }

  setSubmitStatus = ({ disabled, type }) => {
    const { status } = this.state;

    return type === 'submit' 
      ? { disabled: status === 'invalid', status }
      : { disabled, status };
  }

  clonedChildren = (children) => {
    return Children.map(children, (child) => {
      if (!child.props) return child;
      
      // Extend ref to use this context if validation required
      const ref = this.setRef(child.ref, child.props);

      // Setting status to apply to submit button.
      const status = this.setSubmitStatus(child.props);
      
      if (child.props.children) {
        return React.cloneElement(child, {
          children: this.clonedChildren(child.props.children),
          ref,
          ...status
        });
      }

      return React.cloneElement(child, {
        ref,
        validateGroup: this.validateGroup,
        ...status
      });
    });
  }

  render () {
    const { children, ...props } = this.props;

    return (
      <div className={styles['form-container']}>
        <form {...props} className={styles[props.className]}>
          {this.clonedChildren(children)}
        </form>
      </div>
    ); 
  }
}

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onValidate: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form;
