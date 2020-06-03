import React, {useState, createRef, useEffect} from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import {PieChart} from 'react-minimal-pie-chart'
import Icon from '../Icon'
import VolumeSlider from '../VolumeSlider'
import styles from './AudioPlayer.module.scss'

const AudioPlayer = (
  {
    id,
    url,
    owner,
    bpm,
    instrument,
    play,
    jumpTo,
    classes,
    onTimeUpdate,
    onDeleteTrack
  }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(100)
  const [bits, setBits] = useState(null)
  const playerRef = createRef()
  const containerClassNames = classNames(styles.audioPlayer, classes)

  useEffect(() => {
    if (playerRef.current) {
      play ? playTrack() : pauseTrack()
      setIsPlaying(play)
    }
  }, [play])

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.currentTime = jumpTo
    }
  }, [jumpTo])

  const playTrack = () => {
    playerRef.current.play()
  }

  const pauseTrack = () => {
    playerRef.current.pause()
  }

  const togglePlay = () => {
    isPlaying ? pauseTrack() : playTrack()
    setIsPlaying(!isPlaying)
  }

  const onTimeUpdateHandler = () => {
    setCurrentProgress((playerRef.current.currentTime / playerRef.current.duration) * 100)
    onTimeUpdate(playerRef.current.currentTime)
  }

  const onVolumeChangeHandler = (event, newValue) => {
    playerRef.current.volume = newValue / 100
    setCurrentVolume(newValue)
  }

  const calculateBits = () => setBits(playerRef.current.duration / 60 * bpm)


  const renderLeftControls = () => {
    const displayBits = bits && `Bits: ${bits.toFixed(1)}`
    return (
      <div className={styles.leftControls}>
        <div className={styles.trackMetadata}>
          <p>{displayBits}</p>
          <Icon icon={'delete'} theme={'outlined'} onClick={() => onDeleteTrack(id)}/>
        </div>
        <VolumeSlider onVolumeChange={onVolumeChangeHandler} value={currentVolume}/>
      </div>
    )
  }

  const renderTrackInfo = () => (
    <div className={styles.trackInfo}>
      <h2>{owner}</h2>
      <h3>{instrument}</h3>
      <p>BPM: {bpm}</p>
    </div>
  )

  const renderPlayButton = () => {
    const data = [
      {value: parseInt(currentProgress), color: '#30d5a0'},
      //to make the canvas fill the progress bar as needed in percentage.
      {value: 100 - parseInt(currentProgress)}
    ]
    return (
      <div className={styles.playButtonContainer}>
        <Icon
          className={styles.playButton}
          icon={isPlaying ? 'pause' : 'play_arrow'}
          onClick={togglePlay}
        />
        <PieChart data={data} className={styles.progress}/>
      </div>
    )
  }

  return (
    <div className={containerClassNames}>
      {renderPlayButton()}
      {renderTrackInfo()}
      <audio
        ref={playerRef}
        src={url}
        loop={play}
        onLoadedMetadata={calculateBits}
        onTimeUpdate={onTimeUpdateHandler}
      />
      {renderLeftControls()}
    </div>
  )
}

AudioPlayer.defaultProps = {
  onTimeUpdate: () => {},
  onDeleteTrack: () => {}
}

AudioPlayer.propTypes = {
  url: propTypes.string,
  owner: propTypes.string,
  bpm: propTypes.number,
  instrument: propTypes.string,
  play: propTypes.bool,
  jumpTo: propTypes.number,
  onTimeUpdate: propTypes.func
}

export default AudioPlayer
