import React from 'react'
import PropTypes from 'prop-types'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

export const wrapRootElement = ({ element }, pluginOptions) => {
  if (!pluginOptions.clientSideID) {
    console.warn(
      '`clientSideID` is not configured. See https://github.com/launchdarkly/gatsby-plugin-launchdarkly#installation'
    )
  }
  const App = () => <>{element}</>
  const LDApp = withLDProvider(pluginOptions)(App)
  return <LDApp />
}
wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired
}
