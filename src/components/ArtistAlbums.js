import { useState,useEffect,Fragment } from "react";
import { useSearchParams,useParams } from 'react-router-dom';
import axios from 'axios'

import isTokenStillValid from "../utils/isTokenStillValid";
import generateSpotifySearchArtistAlbumURL from "../utils/generateSpotifySearchArtistAlbumURL";

import ArtistAlbumStyles from '../styles/ArtistAlbums.module.scss'

export default function ArtistAlbums({accessToken,accessTokenExpirationDate,deleteToken}){
    const [albums,setAlbums]=useState([])
    const {artistId} = useParams();

    //items[0].artists[0].name and .id
    async function fetchAlbums(){
        if (!isTokenStillValid(accessTokenExpirationDate))
            return deleteToken()
        const {data:{items:albumsFetched,total,limit,offset}}=await axios.get(generateSpotifySearchArtistAlbumURL(artistId),{headers:{
            Authorization:`Bearer ${accessToken}`
    }})
        setAlbums(
            albumsFetched.map(
                albumFetched=>(
                    {
                        link:albumFetched.external_urls.spotify,
                        artists:albumFetched.artists.map(({name,id})=>({name,id})),
                        name:albumFetched.name,
                        image:albumFetched.images[0]?.url || "/images/artist.jpg",
                        id:albumFetched.id,
                        releaseDate:albumFetched.release_date,
                        totalTracks:albumFetched.total_tracks
                    }
                )
            )
        )
    }
    useEffect( function(){
        fetchAlbums()
    },[artistId])
    
    
    return <div id={ArtistAlbumStyles.ArtistAlbumsPageContainer}>
                <div id={ArtistAlbumStyles.ArtistName}>
                    <h1>{albums[0]?.artists?.find(({id})=>id==artistId).name || "Artist"}</h1>
                    <h4>Albums</h4>
                </div>
                <div id={ArtistAlbumStyles.AlbumsContainer}>
                    {
                        albums?.map(
                            album=><div key={album.id} className={ArtistAlbumStyles.Album}>
                                        <img alt="Album" src={album.image}/>
                                        <h3>{album.name}</h3>
                                        <h6 className={ArtistAlbumStyles.ArtistsName}>{album.artists.map(({name})=>name).join()}</h6>
                                        <h6 className={ArtistAlbumStyles.Date} >{album.releaseDate}</h6>
                                        <h6 className={ArtistAlbumStyles.Tracks} >{`${album.totalTracks} track${album.totalTracks>1?'s':''}`}</h6>
                                        <a className={ArtistAlbumStyles.Preview} rel="noreferrer" href={album.link} target="_blank">Preview on Spotify</a>
                                    
                                    </div>
                        )
                    }
                </div>
        </div>
}