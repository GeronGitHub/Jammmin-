import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
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
  const [playlistName, setPlaylistName] = useState('')
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

  function removeTrack(track) {
    // Function to remove a track from the playlist
    setPlaylistTracks(prevTracks => prevTracks.filter(t => t.id !== track.id))
  }

  function savePlaylist(){
    // Function to save the playlist to Spotify
    const trackURIs = playlistTracks.map(track => track.uri);

    // Mock logic to simulate saving the playlist to Spotify
    console.log("Saving playlist with URIs:", trackURIs);
    alert("Saving playlist with URIs:", trackURIs)

    // Clear out the playlist after saving
    setPlaylistName('');
    setPlaylistTracks([]);
  }

  return (
    <>
      <h1>Jammmin'</h1>
      <SearchBar />
      <div>
        <SearchResults tracks={searchResults} onAdd={addTrack}/>
        <Playlist 
          name={playlistName}
          tracks={playlistTracks}
          onRemove={removeTrack}
          setName={setPlaylistName}
          onSave={savePlaylist}/>
      </div>
    </>
  )
}

export default App
