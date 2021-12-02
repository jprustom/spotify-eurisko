export default function generateSpotifySearchArtistsURL(query){
    return `https://api.spotify.com/v1/search?q=${query}&type=artist`
}