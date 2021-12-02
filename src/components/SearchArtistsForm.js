import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import generateSpotifySearchArtistsURL from "../utils/generateSpotifySearchArtistsURL";
import isTokenStillValid from "../utils/isTokenStillValid";

import SearchArtistsStyles from "../styles/SearchArtistsForm.module.scss";

export default function SearchArtistsForm({setArtists,accessToken,accessTokenExpirationDate,deleteToken}){ 
        const [query,setQuery]=useState("")
        const navigate = useNavigate();

        const isFirstSearch=setArtists==null //No previous artists fetched, center our search bar like in the wireframes page 2

        async function onSearchFormSubmitHandler(e){
                e.preventDefault();
                if (setArtists && accessToken){
                        if (!isTokenStillValid(accessTokenExpirationDate))
                                return deleteToken() //forces re-login
                        const {data:{artists:{items:artistsFetched}}}=await axios.get(generateSpotifySearchArtistsURL(query),{headers:{
                                Authorization:`Bearer ${accessToken}`
                        }})
                        setArtists(artistsFetched)
                }
                else navigate("/artists/search?q="+query) //If we are at page 2 in our wireframes
        }

        function MagnifyingGlassIcon(){
                return <svg onClick={onSearchFormSubmitHandler} id={SearchArtistsStyles.Icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/>
                        </svg>
        }

        async function onQueryChangeHandler({target:{value}}){
                if (setArtists && accessToken){
                        const {data:{artists:{items:artistsFetched}}}=await axios.get(generateSpotifySearchArtistsURL(value),{headers:{
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
                else setQuery(value)
        }
        return <form onSubmit={onSearchFormSubmitHandler} id={SearchArtistsStyles.SearchArtistsContainer} className={isFirstSearch?SearchArtistsStyles.Centered:""}>
                        <input onChange={onQueryChangeHandler} id={SearchArtistsStyles.SearchArtistsInput} placeholder="Search for an artist..."/>
                        <MagnifyingGlassIcon/>
                </form>
}