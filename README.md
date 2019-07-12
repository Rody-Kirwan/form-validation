# Sample Application

This is a sample application to display form management / validation solution using React component-state managment.

It was my decision to make any Redux implementation a low priority. i.e (Implement in redux if I have time). 
In my opnion form state should largely be ephemeral and is much simpler managed in component-state. For this project I tried to focus on building:

  - Solid scalable application foundation / file structure
  - A validation solution (that definitely requires some work)
  - A clear GIT commit history to make process as transparent as possible
  - And a final lightweight artifact

I will branch from this to create a quick redux implementation as an example.
There is also still significant work needed on styling / refactoring / unit testing etc. 

To run:
  - Node > v10 => `npm start` (Probably works on > v8)
  - Docker => `./build.sh && ./run.sh`

## Main Technologies Used
### Browser Based

React v16
https://github.com/facebook/react/

React Router DOM
https://www.npmjs.com/package/react-router-dom

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

### Other 
Docker
https://www.docker.com/
