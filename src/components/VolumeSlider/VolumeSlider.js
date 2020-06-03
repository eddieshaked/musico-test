import React from 'react'
import propTypes from 'prop-types'
import Slider from '@material-ui/core/Slider'
import Icon from '../Icon'
import styles from './VolumeSlider.module.scss'

const VolumeSlider = ({value, onVolumeChange}) => {
  let volumeIcon

  if (!value) {
    volumeIcon = 'volume_off'
  } else if (value < 50) {
    volumeIcon = 'volume_down'
  } else {
    volumeIcon = 'volume_up'
  }

  return (
    <div className={styles.volumeSlider}>
      <Icon icon={volumeIcon}/>
      <Slider onChange={onVolumeChange} defaultValue={100} className={styles.slider}/>
    </div>
  )
}

VolumeSlider.defaultProps = {
  onVolumeChange: () => {}
}

VolumeSlider.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onVolumeChange: propTypes.func
}

export default VolumeSlider
