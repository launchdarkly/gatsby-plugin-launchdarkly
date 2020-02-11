import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as LDClient from 'launchdarkly-js-client-sdk'
import { LaunchDarklyContext } from './index'

const LDRootProvider = ({ children }) => {
  const ldclient = LDClient.initialize(
    // eslint-disable-next-line no-undef
    process.env.LD_CLIENT_ID,
    {
      anonymous: true
    },
    // eslint-disable-next-line no-undef
    JSON.parse(process.env.LD_CLIENT_OPTIONS)
  )

  return <LDProviderListener ldclient={ldclient}>{children}</LDProviderListener>
}

LDRootProvider.propTypes = {
  children: PropTypes.element.isRequired
}

const LDProviderListener = ({ children, ldclient }) => {
  let flags = useRef({})
  const [flagsState, setFlags] = useState(flags.current)

  useEffect(() => {
    ldclient.on('ready', () => {
      flags.current = ldclient.allFlags()
      setFlags(flags.current)
    })
    ldclient.on('change', newFlags => {
      Object.keys(newFlags).map(async flag => {
        const newVariation = await ldclient.variation(flag, flags.current[flag])
        flags.current = { ...flags.current, [flag]: newVariation }
        setFlags(flags.current)
      })
    })
  }, [ldclient])

  const variation = (key, dflt) => {
    return flagsState[key] || dflt
  }

  return (
    <LaunchDarklyContext.Provider
      value={{ flags: flagsState, variation, ldclient }}
    >
      {children}
    </LaunchDarklyContext.Provider>
  )
}

LDProviderListener.propTypes = {
  children: PropTypes.element.isRequired,
  ldclient: PropTypes.object.isRequired
}

export const LDProvider = ({ children }) => {
  return <LDRootProvider>{children}</LDRootProvider>
}

LDProvider.propTypes = {
  children: PropTypes.element.isRequired
}
