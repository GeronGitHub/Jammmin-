import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Tracklist from './components/Tracklist'
import Track from './components/Track'
import Playlist from './components/Playlist'
import './App.css'

function App() {
  // Hardcoded sample data for search results
  const [searchResults, setSearchResults] = useState([
    { id: '1', name: 'Go', artist: 'Karri ft Kehlani', album: 'Single'}, 
    { id: '2', name: 'Headlines', artist: 'Drake', album: 'Take Care (Deluxe)'}, 
    { id: '3', name: 'Kiss Me Right', artist: 'Keshi', album: 'Requiem (Bonus Edition)'}, 
    { id: '4', name: 'Yukon', artist: 'Justin Bieber', album: 'SWAG'}, 
  ])
  
  // Hardcoded sample data for playlist
  const [playlistName, setPlaylistName] = useState('My Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: '5', name: 'LOV3', artist: 'Sik-K ft Bryan Chase, Okasian', album: 'K-FLIP+'},
    { id: '6', name: 'Swim', artist: 'Chase Atlantic', album: 'Chase Atlantic'}
  ])

  function addTrack(track) {
    // Function to add a track to the playlist
    if (!playlistTracks.find(t => t.id === track.id)){
      setPlaylistTracks(prevTracks => [...prevTracks, track])
    }
  }

  return (
    <>
      <h1>Jammmin'</h1>
      <SearchBar />
      <div>
        <SearchResults tracks={searchResults} onAdd={addTrack}/>
        <Playlist 
          name={playlistName}
          tracks={playlistTracks}/>
      </div>
    </>
  )
}

export default App
