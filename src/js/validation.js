import * as yup from 'yup';

// TODO: DO BETTER
// This is a bit acrobatic! - prob not verey scalable
// Leaving for the moment cos it works.

const validation = {
  required: {
    validate: yup.string().required(),
    message: `Value is required`
  },
  minLength: {
    validate: yup.string().min(3),
    message: `Value should be longer than 3 characters`
  },
  maxLength: {
    validate: yup.string().max(6),
    message: `Value should be no more than 6 characters`
  },
  email: {
    validate: yup.string().email(),
    message: `Email address is not valid`
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
