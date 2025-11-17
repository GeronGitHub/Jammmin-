import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Tracklist from './components/Tracklist'
import Track from './components/Track'
import Playlist from './components/Playlist'
import './App.css'

function App() {
  return (
    <>
      <h1>Jammmin'</h1>
      <SearchBar />
      <div>
        <SearchResults />
        <Playlist />
      </div>
    </>
  )
}

export default App
