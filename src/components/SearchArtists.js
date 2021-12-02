import { useState,useEffect, Fragment } from "react"
import { useSearchParams } from 'react-router-dom';

import SearchArtistsForm from "../components/SearchArtistsForm"
import SearchArtistsStyles from "../styles/SearchArtists.module.scss"
import axios from 'axios'
import generateSpotifySearchArtistsURL from "../utils/generateSpotifySearchArtistsURL";
import Artist from "./Artist";
import isTokenStillValid from "../utils/isTokenStillValid";

export default function SearchArtists({accessToken,accessTokenExpirationDate,deleteToken}){
    const [artists,setArtists]=useState()
    const [searchParams] = useSearchParams();
    const q=searchParams.get('q')
    
    async function fetchArtists(){
        if (!isTokenStillValid(accessTokenExpirationDate))
            return deleteToken() //forces re-login
        const {data:{artists:{items:artistsFetched}}}=await axios.get(generateSpotifySearchArtistsURL(q),{headers:{
            Authorization:`Bearer ${accessToken}`
        }})
        setArtists(
            artistsFetched.map(
                artistFetched=>(
                    {
                        followersCount:artistFetched.followers.total,
                        name:artistFetched.name,
                        image:artistFetched.images[0]?.url || "/images/artist.jpg", //I can also pick a random element instead of the first element
                        id:artistFetched.id,
                        popularity:artistFetched.popularity
                    }
                )
            )
        )
    }
    useEffect( function(){
        fetchArtists()
    },[q])
    

    return <Fragment>
                <SearchArtistsForm accessToken={accessToken} deleteToken={deleteToken} setArtists={setArtists}/>
                {
                    artists
                        ?<div id={SearchArtistsStyles.ArtistsContainer}>
                            {
                                artists.map(
                                    artist=><Artist key={artist.id} {...artist} />
                                )
                            }
                        </div>
                        :null
                }
        </Fragment>
}