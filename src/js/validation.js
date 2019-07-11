import * as yup from 'yup';

const messages = {
  format: `Email address is not valid`
};

const emailSchema = yup.object().shape({
  email: yup.string().email()
});

export const emailFormat = (value) => emailSchema.isValid({
  email: value
}).then((isValid) => ({
  status: isValid ? 'valid' : 'invalid',
  message: isValid ? '' : messages.format
}));
