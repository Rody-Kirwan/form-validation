
const validateDate = () => ({
  isValid: (value) => new Promise(resolve => {
    if(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(value)) {
      return resolve(true);
    }
    
    return resolve(false);
  })
});

const customValidation = {
  date: {
    validate: ({ value }) => validateDate().isValid(value),
    message: ({ option, label }) => `${label || 'Date'} should be in format ${option}`
  }
} 

export default customValidation;

