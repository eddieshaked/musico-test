import React, {useState} from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import AudioPlayer from '../AudioPlayer'
import Button from '../Button'
import styles from './Playlist.module.scss'

const Playlist = ({playlist, onDeleteTrack, classes}) => {
  const [playAll, setPlayAll] = useState(false)
  const [currentSeekTime, setCurrentSeekTime] = useState(null)
  let latestTrackTime = 0

  if (!playlist || !playlist.length) {
    return null
  }

  const getGreatestBpm = () => {
    playlist.reduce((acc, {bpm}) => {
      if (bpm > acc) {
        acc = bpm
        return acc
      }
      return acc
    }, 0)
  }
  const playAllTracks = () => {
    setPlayAll(!playAll)
    if (playAll) {
      setCurrentSeekTime(0)
    } else {
      //to make sure the component will update if the currentSeekTime was 0 already
      setCurrentSeekTime(null)
    }
  }

  const onTimeUpdateHandler = time => {
    latestTrackTime = time
  }

  const seekTime = () => {
    getGreatestBpm()
    setCurrentSeekTime(latestTrackTime)
  }

  const renderButtonsContainer = () => {
    console.log(playlist.length)
    if(playlist.length === 1 ) {
      return null
    }

    return (
      <>
        <Button onClick={seekTime}>SYNC</Button>
        <Button onClick={playAllTracks}>{playAll ? 'PAUSE' : 'PLAY'}</Button>
      </>
    )
  }


  const renderHeader = () => {
    return (
      <div className={styles.buttonsContainer}>
        <h2>Selected Tracks</h2>
        {renderButtonsContainer()}
      </div>
    )
  }

  return (
    <div className={classNames(classes)}>
      {renderHeader()}
      {playlist.map(track =>
        <AudioPlayer
          classes={styles.player}
          key={track.id}
          play={playAll}
          onTimeUpdate={onTimeUpdateHandler}
          jumpTo={currentSeekTime}
          onDeleteTrack={onDeleteTrack}
          {...track}
        />)}
    </div>
  )
}

Playlist.defaultProps = {
  onDeleteTrack: () => {
  }
}

Playlist.propTypes = {
  playlist: propTypes.arrayOf(propTypes.shape({
    Id: propTypes.number,
    instrument: propTypes.string,
    url: propTypes.string,
    owner: propTypes.string,
    bpm: propTypes.number
  })),
  onDeleteTrack: propTypes.func
}

export default Playlist