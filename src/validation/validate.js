import pick from 'lodash/pick';
import deepExtend from 'deep-extend';
import defaultValidators from './validators';

function setValid () {
  return {
    status: 'valid',
    message: ''
  }
}

function makeValidatorsArray(props, validatePropFn) {
  return Object.keys(props)
    .map(validatePropFn);
} 

function validateProp(opts, config, executeFn) {
  return (key) => executeFn({
    option: opts[key],
    type: key,
    ...opts
  }, config[key].message, config[key].validate);
}

async function executeValidation(props, messageFn, validatorFn) {
  let isValid;

  try {
    isValid = await validatorFn(props);
  } catch (err) {
    throw new Error(err);
  }

  return isValid || Promise.reject({
    status: 'invalid',
    message: messageFn(props)
  });
}

export default function validate(customValidators = {}) {
  const validators = deepExtend(defaultValidators(), customValidators);
  const validatorKeys = Object.keys(validators);
  
  const validateGroup = (props) => Promise.all(
    makeValidatorsArray(
      pick(props, validatorKeys),
      validateProp(props, validators, executeValidation)
    )
  )
  .then(setValid)
  .catch(invalid => invalid);

  return {
    validationTypes: Object.keys(validators),
    validate: validateGroup,
    validators,
  };
}

