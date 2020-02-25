import React from 'react'
import PropTypes from 'prop-types'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

export const wrapRootElement = ({ element }) => {
  const App = () => <>{element}</>

  const LDApp = withLDProvider({
    // eslint-disable-next-line no-undef
    clientSideID: process.env.LD_CLIENT_ID
  })(App)

  return <LDApp />
}
wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired
}
