import React from 'react'
import PropTypes from 'prop-types'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

// eslint-disable-next-line no-undef
if (!process.env.LD_CLIENT_ID) {
  console.warn(
    'LD_CLIENT_ID is not configured. See https://github.com/launchdarkly-labs/gatsby-plugin-launchdarkly#installation'
  )
}

let ldOpts = {}
try {
  // eslint-disable-next-line no-undef
  ldOpts = JSON.parse(process.env.LD_CLIENT_OPTIONS)
  // eslint-disable-next-line no-empty
} catch (err) {
  console.warn(
    'LD_CLIENT_OPTIONS is not a proper JSON string. Bypassing options config.'
  )
}

export const wrapRootElement = ({ element }) => {
  const App = () => <>{element}</>

  const LDApp = withLDProvider({
    // eslint-disable-next-line no-undef
    clientSideID: process.env.LD_CLIENT_ID,
    options: ldOpts
  })(App)

  return <LDApp />
}
wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired
}
