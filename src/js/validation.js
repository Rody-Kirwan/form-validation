import { string as validateString } from 'yup';
import pick from 'lodash/pick';
import deepExtend from 'deep-extend';

export default function (options) {

  const validation = deepExtend({
    required: {
      validate: ({ value }) => validateString().required().isValid(value),
      message: ({ label }) => `${label || 'Value'} is required`
    },
    minLength: {
      validate: ({ value, option }) => validateString().min(option).isValid(value),
      message: ({ option, label }) => `${label || 'Value'} should be longer than ${option} characters`
    },
    maxLength: {
      validate: ({ value, option }) => validateString().max(option).isValid(value),
      message: ({ option, label }) => `${label || 'Value'} should be no more than ${option} characters`
    },
    email: {
      validate: ({ value }) => validateString().email().isValid(value),
      message: ({ label }) => `${label || 'Email'} is not valid`
    },
    format: {
      validate: ({ value, option }) => Promise.resolve(option.test(value)),
      message: ({ option, label }) => `${label || 'Value'} should be match ${option}`
    }
  }, options);
  
  const validate = ({ validateFn, ...props }) => {
    return validateFn(props)
      .then((isValid) => (
        isValid || Promise.reject({
          status: 'invalid',
          message: validation[props.type].message(props)
        })
      ));
  };
  
  const setValid = () => ({
    status: 'valid',
    message: ''
  });
  
  const validateStr = (props) => {
    const validationProps = pick(props, Object.keys(validation));
    
    return Promise.all(
      Object.keys(validationProps).map(type => validate({
        type,
        option: validationProps[type],
        validateFn: validation[type].validate,
        ...props
      }))
    )
    .then(setValid)
    .catch(invalid => invalid);
  };

  return {
    validationTypes: Object.keys(validation),
    validation: validation,
    validate: validateStr
  }
}

