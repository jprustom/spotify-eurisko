import './App.css';
import {Routes,Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import LoginButton from './components/LoginButton';
import SearchArtists from "./components/SearchArtists"
import SearchArtistsForm from "./components/SearchArtistsForm"
import ArtistAlbums from "./components/ArtistAlbums"

import getHashParams from './utils/getHashParams';

function App() {  
  const [accessToken,setAccessToken]=useState("");
  const [accessTokenExpirationDate,setAccessTokenExpirationDate]=useState()

  useEffect(()=>{ //We search for an access token in the URL
      const hashParams=getHashParams()
      if (hashParams && hashParams.access_token){
          const {access_token:accessTokenReceived,expires_in:expiresIn,state: stateReceived}=hashParams
          const stateSaved=localStorage.getItem('spotifyState');
          //If we had a Node js app, we would secure our authentication flow in our backend by storing our client secret as an env variable and not commiting it to github
          //Since here we only use React, we don't use the client secret (never store any sensitive info on client side)
          //We can add a bit of security using the state param. If state was changed then someone interecepted with our request for malicious purposes, using CSRF for eg
          if (stateSaved!==stateReceived)
              return  //for the sake of this example exercise I will just return
          
          setAccessToken(accessTokenReceived);
          setAccessTokenExpirationDate(Math.round(Date.now() / 1000)+expiresIn);

      }
  },[])
  return accessToken //In larger apps I would store access token with the context API / redux. here I have a small web app so no prop drilling issue
          ?<Routes>
            <Route path="/" element={<LoginButton/>}/>
            <Route path="/artists/search" element={<SearchArtists accessToken={accessToken} accessTokenExpirationDate={accessTokenExpirationDate} deleteToken={()=>setAccessToken(null)}/>}/>
            <Route path="/artists/:artistId/albums" element={<ArtistAlbums accessToken={accessToken} accessTokenExpirationDate={accessTokenExpirationDate}  deleteToken={()=>setAccessToken(null)} />}/>
            <Route path="/callback" element={<SearchArtistsForm/>}/>
          </Routes>
          :<LoginButton/>
}

export default App;
