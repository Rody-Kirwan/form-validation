import pick from 'lodash/pick';
import deepExtend from 'deep-extend';
import defaultValidation from './default-validation';

const setValid = () => ({
  status: 'valid',
  message: ''
});

export default function (customValidation) {
  const validation = deepExtend(defaultValidation, customValidation);
  const pickValidationProps = (props) => pick(props, Object.keys(validation));
  
  const executeValidation = async ({ validator, ...props }) => {
    const isValid = await validator(props);
    
    return isValid || Promise.reject({
      status: 'invalid',
      message: validation[props.type].message(props)
    });
  };

  const validateProp = (props) => (type) => executeValidation({
    validator: validation[type].validate,
    option: props[type],
    type,
    ...props
  });

  const validatorsArray = (props) => Object.keys(pickValidationProps(props))
    .map(validateProp(props));
  
  const validateGroup = (props) => Promise.all(validatorsArray(props))
    .then(setValid)
    .catch(invalid => invalid);

  return {
    validationTypes: Object.keys(validation),
    validation: validation,
    validate: validateGroup
  };
}

