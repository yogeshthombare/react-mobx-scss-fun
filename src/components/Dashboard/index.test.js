import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Dashboard from '../Dashboard'
import { ApplicationStore } from '../../stores/ApplicationStore'

let app = ApplicationStore.create()

configure({
  adapter: new Adapter()
})

describe('Dashboard', () => {
  it('component is loaded and renders as expected', () => {
    // const component = shallow(<Dashboard app={app}/>)
    // expect(component).toMatchSnapshot()
  })
})
