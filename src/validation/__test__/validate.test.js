const isValidSchema = ({ validationTypes, validate, validators }) => {
  return (
    Array.isArray(validationTypes) &&
    typeof validators === 'object' &&
    typeof validate === 'function' &&
    (validate() instanceof Promise) === true
  );
};

const mockValidator = {
  validate: ({ isValid, value }) => Promise.resolve(isValid === value),
  message: ({ message }) => message
}

const objIncludesAllKeys = (obj, keys) => Object.keys(obj).every(k => keys.includes(k));

describe('Validate', () => {
  const initValidate = require('../validate').default;
  const validStatus = {
    status: 'valid',
    message: ''
  };

  describe('function: validate', () => {
    it('should return an object matching validateSchema', () => {
      const validation = initValidate();
      expect(isValidSchema(validation)).toBe(true);
    })

    it('should return correct default validators', () => {
      const validation = initValidate();
      const { validators, validationTypes } = validation;

      expect(objIncludesAllKeys(validators, validationTypes)).toBe(true);
    });

    it('should extend with custom validators', () => {
      const validation = initValidate({
        customValidator: mockValidator
      });

      const { validators, validationTypes } = validation;

      expect(objIncludesAllKeys(validators, validationTypes)).toBe(true);
      expect(validationTypes.includes('customValidator')).toBe(true);
    })
  });

  describe('function: validateGroup', () => {
    it('should pass validation if no matching validator is found', () => {
      const validation = initValidate({
        isValid: mockValidator
      });

      const { validate } = validation;

      const validProps = {
        randomProp1: 'true',
        randomProp2: true,
        randomProp3: 57,
        value: true
      }

      return expect(validate(validProps)).resolves.toEqual({
        status: 'valid',
        message: ''
      });
    });

    it('should overwrite default validator message with custom message', () => {
      const customMessage = 'My custom message';
      const defaultValidator = 'maxLength';

      const validation = initValidate({
        [defaultValidator]: {
          message: () => customMessage
        }
      });

      const { validate } = validation;

      const props = {
        maxLength: 3,
        value: '1234'
      }

      return expect(validate(props)).resolves.toEqual({
        status: 'invalid',
        message: customMessage
      });
    }); 

    it('should overwrite default validator function with custom function', () => {
      const customValidation = ({ value }) => value === 'test@test.com';
      const defaultValidator = 'email';

      const validation = initValidate({
        [defaultValidator]: {
          validate: customValidation
        }
      });

      const { validate } = validation;

      const props = {
        email: true,
        value: 'email@validformat.com'
      }

      return expect(validate(props)).resolves.toEqual({
        status: 'invalid',
        message: 'Email is not valid'
      });
    });

    it('should resolve with valid status for successful validation', () => {
      const validation = initValidate({
        isValid: mockValidator
      });

      const { validate } = validation;

      const validProps = {
        isValid: true,
        value: true
      };

      return expect(validate(validProps)).resolves.toEqual(validStatus);
    });

    it('should resolve with invalid status for failed validation', () => {
      const validation = initValidate({
        isValid: mockValidator
      });

      const { validate } = validation;

      const inValidProps = {
        isValid: false,
        message: 'isValid does not equal value',
        value: true
      }

      return expect(validate(inValidProps)).resolves.toEqual({
        status: 'invalid',
        message: inValidProps.message
      });
    });

    it('should validate against multiple validators specified in props (invalid email)', () => {
      const validation = initValidate();

      const { validate, validators: defaultValidators } = validation;

      const getValidatorMessage = (validator, props) => defaultValidators[validator].message(props)

      const validators = {
        email: true,
        maxLength: 10,
        minLength: 8
      };

      const props = {
        ...validators,
        value: 'ttest.co'
      }

      return expect(validate(props)).resolves.toEqual({
        status: 'invalid',
        message: getValidatorMessage('email', props)
      });
    });

    it('should validate against multiple validators specified in props (invalid maxLength)', () => {
      const validation = initValidate();

      const { validate, validators: defaultValidators } = validation;

      const getValidatorMessage = (validator, props) => defaultValidators[validator].message(props);

      const validators = {
        email: true,
        maxLength: 10,
        minLength: 8
      };

      const props = {
        ...validators,
        value: 'ttest@test.com'
      }

      return expect(validate(props)).resolves.toEqual({
        status: 'invalid',
        message: getValidatorMessage('maxLength', { ...props, option: validators.maxLength })
      });
    });

    it('should validate against multiple validators specified in props (invalid minLength)', () => {
      const validation = initValidate();

      const { validate, validators: defaultValidators } = validation;

      const getValidatorMessage = (validator, props) => defaultValidators[validator].message(props)

      const validators = {
        email: true,
        maxLength: 10,
        minLength: 8
      };

      const props = {
        ...validators,
        value: 't@t.com'
      }

      return expect(validate(props)).resolves.toEqual({
        status: 'invalid',
        message: getValidatorMessage('minLength', { ...props, option: validators.minLength })
      });
    });
  });
})