import React, { memo } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'


const Button = ({ children, variant, ...otherProps }) => {
  const buttonClassNames = classNames(
    styles.button,
    styles[variant],
  )

  return (
    <button className={ buttonClassNames } { ...otherProps }>{ children }</button>
  )
}

Button.defaultProps = {
  variant: 'ghost',
  onClick: () => {},
}

Button.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.element]),
  variant: propTypes.oneOf(['ghost', 'fill']),
  onClick: propTypes.func,
}

export default memo(Button)