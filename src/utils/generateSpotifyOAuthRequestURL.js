import generateRandomString from "./generateRandomString";
import { SPOTIFY_REDIRECT_URI,SPOTIFY_CLIENT_ID,SPOTIFY_SCOPE } from "./constants";

export default function generateSpotifyOAuthRequestURL(){
    const state=generateRandomString(16);
    localStorage.setItem("spotifyState", state);
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(SPOTIFY_CLIENT_ID)}&scope=${encodeURIComponent(SPOTIFY_SCOPE)}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&state=${encodeURIComponent(state)}`
}