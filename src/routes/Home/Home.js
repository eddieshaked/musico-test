import React, {useState} from 'react'
import playlistData from '../../services/playlist'
import Playlist from '../../components/Playlist'
import TreeSelect from '../../components/TreeSelect'
import styles from './Home.module.scss'

const Home = () => {
  const [selectedTracks, setSelectedTracks] = useState([])
  const mapPlayList = {}

  const setMapPlayList = () => {
    playlistData.map(track => {
      mapPlayList[track.id] = track
    })
  }

  setMapPlayList()

  const selectItem = id => {
    mapPlayList[id].selected = true
    selectedTracks.push(mapPlayList[id])
    setSelectedTracks([...selectedTracks])
  }

  const removeItem = id => {
    mapPlayList[id].selected = false
    const filteredTracks = selectedTracks.filter(item => item.id !== id)
    setSelectedTracks(filteredTracks)
  }

  const onItemClick = id => {
    if(!mapPlayList[id].selected) {
      selectItem(id)
    } else {
      removeItem(id)
    }
  }

  return (
    <main className={styles.home}>
      <TreeSelect
        list={playlistData}
        classes={styles.listContainer}
        onItemClick={onItemClick}
      />
      <Playlist
        classes={styles.playList}
        playlist={selectedTracks}
        onDeleteTrack={removeItem}
      />
    </main>
  )
}

export default Home
