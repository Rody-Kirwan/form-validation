import { string as validateString } from 'yup';

const validateDate = () => ({
  isValid: (value) => new Promise(resolve => {
    if(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(value)) {
      return resolve(true);
    }
    
    return resolve(false);
  })
});

// TODO: DO BETTER
// This is a bit acrobatic! - prob not verey scalable
// Leaving for the moment cos it works.

const validation = {
  required: {
    validate: validateString().required(),
    message: `Value is required`
  },
  minLength: {
    validate: validateString().min(3),
    message: `Value should be longer than 3 characters`
  },
  maxLength: {
    validate: validateString().max(6),
    message: `Value should be no more than 6 characters`
  },
  email: {
    validate: validateString().email(),
    message: `Email address is not valid`
  },
  date: {
    validate: validateDate(),
    message: 'Date entered is an invalid format'
  }
};

const validate = (type, value, validateFn) => {
  return validateFn.isValid(value)
    .then((isValid) => (
      isValid || Promise.reject(type)
    ));
};

export const ValidateStr = (value, options=[]) => Promise.all(
  options.map(type => validate(type, value, validation[type].validate))
)
.then(() => ({
  status: 'valid',
  message: ''
}))
.catch((type) => ({
  status: 'invalid',
  message: validation[type].message
}));
