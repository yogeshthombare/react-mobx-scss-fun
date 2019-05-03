import React from 'react'
import ReactDOM from 'react-dom'
import Input from '../Input'

describe('Input', () => {
  it('component is loaded and renders an input', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input/>, div)
    ReactDOM.unmountComponentAtNode(div)
  });
})
