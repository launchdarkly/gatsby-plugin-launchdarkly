import React from 'react'
import renderer from 'react-test-renderer'
import { LDProvider } from 'launchdarkly-react-client-sdk'


import { wrapRootElement } from './gatsby-browser'

describe('LaunchDarkly gets injected in by wrapRootElement', () => {
  it('contains the proper state', () => {
    const WrappedTestComponent = wrapRootElement(
      { element: <></> },
      { clientSideID: 'dummyid' }
    )
    const wrapped = renderer.create(WrappedTestComponent)
    const instance = wrapped.root.findByType(LDProvider).instance

    expect(instance.state).toHaveProperty('flags', {})
    expect(instance.state).toHaveProperty('ldClient')
  })
})
