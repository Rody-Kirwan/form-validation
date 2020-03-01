import pick from 'lodash/pick';
import deepExtend from 'deep-extend';
import defaultValidation from './default-validation';

const setValid = () => ({
  status: 'valid',
  message: ''
});

export default function (customValidation) {
  const validation = deepExtend(defaultValidation, customValidation);
  
  const validate = ({ validateFn, ...props }) => {
    return validateFn(props)
      .then((isValid) => (
        isValid || Promise.reject({
          status: 'invalid',
          message: validation[props.type].message(props)
        })
      ));
  };
  
  const validateStr = (props) => {
    const validationProps = pick(props, Object.keys(validation));

    const executeValidation = (type) => validate({
      type,
      option: validationProps[type],
      validateFn: validation[type].validate,
      ...props
    });
    
    return Promise.all(
      Object.keys(validationProps).map(executeValidation)
    )
    .then(setValid)
    .catch(invalid => invalid);
  };

  return {
    validationTypes: Object.keys(validation),
    validation: validation,
    validate: validateStr
  };
}

