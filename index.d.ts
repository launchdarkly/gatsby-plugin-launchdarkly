import React from 'react'
import * as LDClient from 'launchdarkly-js-client-sdk'

declare module 'gatsby-plugin-launchdarkly' {
  /**
   * The LaunchDarklyContext
   *
   * This is a React.Context containing LaunchDarkly bits that can be accessed
   * in any React component.
   *
   * ```
   * // Preferred usage:
   * import { LaunchDarklyContext } from 'gatsby-plugin-launchdarkly';
   *
   * // Inside a React functional component...
   * const MyComponent = ({ someProp }) => {
   *   const { variation } = useContext(LaunchDarklyContext)
   *
   *   return (
   *     <header
   *       style={{
   *         background: variation('some-new-feature', false) ? 'green' : 'red'
   *       }}
   *     >
   * ...
   * ```
   *
   * @return LaunchDarklyContextDefaults
   *    * `flags`: an object representing the current state of the flags
   *      in LaunchDarkly
   *    * `variation`: a helper function that allows you to retreive a flag's
   *      value and provide a default value should the flag not exist
   *    * `ldclient`: an instance of the LDClient. Allows you to use the main
   *      LaunchDarkly client SDK directly.
   *
   * @see https://github.com/launchdarkly-labs/gatsby-plugin-launchdarkly#basic-usage
   */
  export const LaunchDarklyContext: React.Context<LaunchDarklyContextDefaults>
}

type flagValue = string | number | boolean | object | null | undefined

interface LaunchDarklyContextDefaults {
  /**
   * an object representing the current state of the flags in LaunchDarkly
   */
  flags: { [key: string]: flagValue }
  /**
   * a helper function that allows you to retreive a flag's value and provide a
   * default value should the flag not exist
   */
  variation(flagkey: string, defaultValue: flagValue): flagValue
  /**
   * an instance of the LDClient. Allows you to use the main LaunchDarkly client
   * SDK directly.
   *
   * @see https://docs.launchdarkly.com/docs/js-sdk-reference
   */
  ldclient: LDClient.LDClient
}
