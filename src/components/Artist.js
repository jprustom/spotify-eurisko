import { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

import ArtistStyles from "../styles/Artist.module.scss"

export default function Artist({id,image,followersCount,name,popularity}){
    const starsContainerRef=useRef()
    const navigate=useNavigate()

    function Review(){
        //Fill reviews' stars
        useEffect(()=>{

            let reviewPercentageToDistribute=popularity*5;
            const starsColorsDom=starsContainerRef.current.querySelectorAll('.'+ArtistStyles.StarColor);
            
            for (let starColorDom of starsColorsDom){
                const widthToAssign=reviewPercentageToDistribute>100?100:reviewPercentageToDistribute;
                starColorDom.style.width=widthToAssign+"%";
                reviewPercentageToDistribute-=widthToAssign;
            }
            },[]) 
        return <div ref={starsContainerRef} className={ArtistStyles.StarsContainer}>
                    <div className={ArtistStyles.Star}>
                        <div className={ArtistStyles.StarColor}/>
                    </div>
                    <div className={ArtistStyles.Star}>
                        <div className={ArtistStyles.StarColor}/>
                    </div>
                    <div className={ArtistStyles.Star}>
                        <div className={ArtistStyles.StarColor}/>
                    </div>
                    <div className={ArtistStyles.Star}>
                        <div className={ArtistStyles.StarColor}/>
                    </div>
                    <div className={ArtistStyles.Star}>
                        <div className={ArtistStyles.StarColor}/>
                    </div>
            </div>
    }
    return <div onClick={()=>navigate(`/artists/${id}/albums`)} className={ArtistStyles.Artist}>
                <img alt="Artist" src={image}/>
                <h3>{name}</h3>
                <h5>{`${followersCount} followers`}</h5>
                <Review/>
            </div>
}