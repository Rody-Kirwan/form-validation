import React from 'react'
import ReactDOM from 'react-dom'

class App extends  React.Component {
  render() {
    return(
      <div className="app-container">
        <h1>Appy Days</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)

