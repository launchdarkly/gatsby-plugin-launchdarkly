import React from 'react'
import renderer from 'react-test-renderer'

import { wrapRootElement } from './gatsby-browser'

describe('LaunchDarkly gets injected in by wrapRootElement', () => {
  it('contains the proper state', () => {
    const WrappedTestComponent = wrapRootElement(
      { element: <></> },
      { clientSideID: 'dummyid' }
    )
    const tree = renderer.create(WrappedTestComponent).toTree()
    expect(tree.instance.state).toHaveProperty('flags', {})
    expect(tree.instance.state).toHaveProperty('ldClient')
  })
})
