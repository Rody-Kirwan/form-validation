import { string as validateString } from 'yup';
import pick from 'lodash/pick';

const validateDate = () => ({
  isValid: (value) => new Promise(resolve => {
    if(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(value)) {
      return resolve(true);
    }
    
    return resolve(false);
  })
});

const validation = {
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
  date: {
    validate: ({ value }) => validateDate().isValid(value),
    message: ({ option, label }) => `${label || 'Date'} should be in format ${option}`
  },
  format: {
    validate: ({ value, option }) => Promise.resolve(option.test(value)),
    message: ({ option, label }) => `${label || 'Value'} should be match ${option}`
  }
};

const validate = ({ type, value, option, label, validateFn }) => {
  return validateFn({ value, option })
    .then((isValid) => (
      isValid || Promise.reject({
        status: 'invalid',
        message: validation[type].message({
          option,
          label
        })
      })
    ));
};

export const validateStr = ({ value, label, ...rest }) => {
  const validationProps = pick(rest, Object.keys(validation));
  
  return Promise.all(
    Object.keys(validationProps)
      .map(type => validate({
        type,
        value, 
        label, 
        option: validationProps[type],
        validateFn: validation[type].validate
      }))
  )
  .then(() => ({
    status: 'valid',
    message: ''
  }))
  .catch(res => res);
};

export default {
  validationTypes: Object.keys(validation),
  validate: validateStr
};

