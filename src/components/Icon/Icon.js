import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import '../../assets/fonts/material-Icons-font/index.scss'

//Supported icons - https://material.io/tools/icons/?style=baseline
const getIconClass = theme => {
  const defaultIconClass = 'material-icons'
  return theme ? `${ defaultIconClass }-${ theme }` : defaultIconClass
}

const Icon = ({ onClick, withText, icon, className, theme, ...props }) => {
  const iconClassNames = classNames('icon', getIconClass(theme), { 'with-text': withText }, className)
  return (
    <i className={ iconClassNames } onClick={ onClick } { ...props }>{ icon }</i>
  )
}

Icon.defaultProps = {
  onClick: value => value
}

Icon.propTypes = {
  icon: propTypes.string,
  theme: propTypes.oneOf([ 'sharp', 'two-tone', 'round', 'outlined' ]),
  disabled: propTypes.bool,
  withText: propTypes.bool,
  className: propTypes.string,
  onClick: propTypes.func
}
export default Icon
