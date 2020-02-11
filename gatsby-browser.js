import React from 'react'
import PropTypes from 'prop-types'
import { LDProvider } from './LDProvider'

export const wrapRootElement = ({ element }) => (
  <LDProvider>{element}</LDProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired
}