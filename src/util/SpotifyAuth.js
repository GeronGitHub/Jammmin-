import { generateCodeVerifier, generateCodeChallenge } from './PKCE';

const clientID = 'e8193f9d45384731bf4a342ce9596a14';
const redirectURI = 'http://127.0.0.1:5173/callback';
const scopes = 'playlist-modify-public playlist-modify-private';

export async function redirectToSpotifyAuth() {
  const verifier = generateCodeVerifier();
  localStorage.setItem('pkce_verifier', verifier);

  const challenge = await generateCodeChallenge(verifier);

  const authURL = `https://accounts.spotify.com/authorize?` +
    `client_id=${clientID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectURI)}` +
    `&code_challenge_method=S256` +
    `&code_challenge=${challenge}` +
    `&scope=${encodeURIComponent(scopes)}`;

  window.location.href = authURL;
}

export async function exchangeCodeForToken(code) {
  const verifier = localStorage.getItem('pkce_verifier');

  const body = new URLSearchParams({
    client_id: clientID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectURI,
    code_verifier: verifier
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  const data = await response.json();
  // data.access_token contains your Spotify token
  localStorage.setItem('spotify_access_token', data.access_token);
  return data.access_token;
}