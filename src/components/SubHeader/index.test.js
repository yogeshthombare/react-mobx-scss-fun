import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import SubHeader from '../SubHeader'
import { ApplicationStore } from '../../stores/ApplicationStore'

// let app = ApplicationStore.create()

configure({
  adapter: new Adapter()
})

describe('SubHeader', () => {
  it('component is loaded and renders as expected', () => {
    // const subheader = shallow(<SubHeader app={app}/>)
    // expect(subheader).toMatchSnapshot()
  }) 
})
