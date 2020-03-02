import { string as validateString } from 'yup';

const defaultValidation = {
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
};

export default defaultValidation;
