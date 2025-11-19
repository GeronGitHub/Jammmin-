import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'
import { redirectToSpotifyAuth, exchangeCodeForToken } from './util/SpotifyAuth'
import './App.css'

function safeGetStorageItem(key) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch (err) {
    console.warn('localStorage unavailable:', err);
    return null;
  }
}

function App() {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      (async () => {
        try {
          await exchangeCodeForToken(code);
          window.history.replaceState({}, null, '/'); // clean URL
        } catch (err) {
          console.error('Token exchange failed:', err);
        }
      })();
    } else {
      const token = safeGetStorageItem('spotify_access_token');
      if (!token) redirectToSpotifyAuth();
    }
  }, []);

  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('')
  const [playlistTracks, setPlaylistTracks] = useState([])

  async function searchTracks(query){
    const token = safeGetStorageItem('spotify_access_token');
    if (!token){
      console.error("No Spotify token found");
      return;
    }

    try {
      const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok){
        console.error("Search failed:", await response.text());
        return;
      }

      const data = await response.json();
      const items = (data && data.tracks && data.tracks.items) || [];
      const tracks = items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists?.[0]?.name || 'Unknown Artist',
        album: track.album?.name || 'Unknown Album',
        uri: track.uri
      }));

      setSearchResults(tracks);
    } catch (err) {
      console.error('Search error:', err);
    }
  }

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

  async function savePlaylist() {
  const token = safeGetStorageItem('spotify_access_token');
  if (!token) {
    console.error('No Spotify token found, redirecting...');
    redirectToSpotifyAuth();
    return;
  }

  if (!playlistName || playlistTracks.length === 0) {
    alert('Please enter a playlist name and add at least one track.');
    return;
  }

  try {
    // Get current user's Spotify ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const userData = await userResponse.json();
    const userId = userData.id;

    // Create a new playlist
    const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'Created with Jammmin\'',
        public: true
      })
    });
    const playlistData = await createResponse.json();
    const playlistId = playlistData.id;

    // Add tracks to the playlist
    const trackURIs = playlistTracks.map(track => track.uri);
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: trackURIs })
    });

    alert(`Playlist "${playlistName}" saved to Spotify!`);
    setPlaylistName('');
    setPlaylistTracks([]);

  } catch (err) {
    console.error('Error saving playlist:', err);
  }
}


  return (
    <>
      <h1>Jammmin'</h1>
      <SearchBar onSearch={searchTracks}/>
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
