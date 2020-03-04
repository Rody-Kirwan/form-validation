# Form Validation Strategy Using React and Custom Validation Module

This is a sample application to display form management / validation solution using React component-state managment.
Form validation is a pain point in a lot of applications. This solution attempts to provide a simple and uniform
pattern for form validation logic in a react application, while still allowing maximum flexiblity to the developer through customization.

The functionality is purposefully split into 3 distinct parts:
 - A validation module which is framework agnostic (this would ideally be a separate NPM package)
 - A REACT based form component wich utilises the validation module (which again could be a separate dependency)
 - A surrounding react application which is bundled with webpack and final artifact built using docker

To run in production mode:
  - Node > v10 => `npm start` (Probably works on > v8)
  - Docker => `./build.sh && ./run.sh`
  
To run in dev mode:
 - `npm run dev`
 
## Custom Validation Module
### validators
```
[name]: {
  validate: ([props]) => [function Promise]
  message: ([props]) => [function Function]
}
```
### Example
```
allCaps: {
  validate: ({ value }) => Promise.resolve(value.split().every(v => v === v.toUpperCase())
  message: ({ option }) => `Value must be in uppercase`
}
```

### Default Validators
```
{
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
}
```
## initialize (default function)
Executing `initialize` creates a validation instance and returns an object containing
 - an array of validator names
 - a validators obj (an object containing all default validators and any extensions passed in)
 - `validate` function which validates a single value against multiple types

### `initialize(customValidators)`

#### Example
```
import initialize from 'validation/validate'

const customValidator = {
    validate: ({ value, option }) => Promise.resolve(option.test(value)),
    message: ({ option, label }) => `${label || 'Value'} should be match ${option}`
  }

const validationObj = initialize(customValidator)

const response = await validationObj.validate({
  value: '12/09/24000'
  customValidator: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  label: Date
})


// response resolves to
{
  status: 'invalid'
  message: 'Date provided must match customValidator'
}
```
#### Validate will process multiple validations on a single value (once specified) and fail on the first condition that is not satisfied:
```
validate({
  value: 'test@tester.com'
  required: true,
  email: true,
  maxLength: 10,
  minLength: 5,
  label: Email
})

// should resolve to
{
  status: 'invalid'
  message: 'Email should be no more than 10 characters`'
}
```

## React Validation Form

### Form Component Props
 - onSubmit: [function Function] (function to handle form submission)
 - onChange: [function Function] (will fire the collective status of child inputs - if one is invalid the form is invalid)
 
### Form Input Component Props
 - Any existing validator of any type (boolean string or number) 
 - value: (boolean string or number) required
 - id: string required
 - validation: object: instanceof Validate
 

### Example Usage
```
const ValidateStr = initialize();

return (
<Form 
  className="subscription" 
  onSubmit={this.handleSubmit}
  onChange={this.setFormStatus}
>
   <FormRow>
     <FormInput
       id="firstname"
       required
       maxLength={10}
       label="First Name"
       onChange={this.handleChange}
       validation={ValidateStr}
       value={this.state.firstName}
       name="firstName"
     />
     <FormInput
       id="lastname"
       required
       maxLength={10}
       label="Last Name"
       onChange={this.handleChange}
       validation={ValidateStr}
       value={this.state.lastName}
       name="lastName"
     />
   </FormRow>
  </Form>
)

```

 
 


## Main Technologies Used

React v16
https://github.com/facebook/react/

YupJS 
https://www.npmjs.com/package/yup

### CSS Compiler
Sass
https://sass-lang.com/

### Node
Webpack
https://github.com/webpack/webpack

Webpack Dev Server
https://github.com/webpack/webpack-dev-server

BabelJS and associated plugins
https://babeljs.io/

Eslint
https://eslint.org/

ServeJS
https://github.com/zeit/serve#readme

Jest
https://jestjs.io/

### Other 
Docker
https://www.docker.com/
