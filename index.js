import React from 'react'

export const LaunchDarklyContext = React.createContext({
  flags: {},
  variation: () => false,
  ldclient: {}
})
