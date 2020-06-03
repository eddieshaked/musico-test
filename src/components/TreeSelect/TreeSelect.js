import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import styles from './TreeSelect.module.scss'

const TreeSelect = ({list, classes, onItemClick}) => {
  if (!list) {
    return null
  }

  const listClasses = classNames(styles.list, classes)

  const renderItem = ({owner, id, selected}) => {
    const classes = classNames(selected && styles.selected)
    return (
      <li
        key={id}
        onClick={() => onItemClick(id)}
        className={classes}
      >
        {owner}</li>
    )
  }

  return (
    <ul className={listClasses}>
      {list.map(renderItem)}
    </ul>
  )
}

TreeSelect.defaultProps = {
  onItemClick: () => {
  }
}

TreeSelect.propTypes = {
  list: propTypes.array.isRequired,
  onItemClick: propTypes.func
}

export default TreeSelect