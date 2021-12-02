import LoginButtonStyles from '../styles/LoginButton.module.scss';
import generateSpotifyOAuthRequestURL from "../utils/generateSpotifyOAuthRequestURL";

export default function LoginButton(props){ 
    async function onLoginButtonClickHandler(){
        window.location=generateSpotifyOAuthRequestURL() //I could also use Navigate from React Router Dom (I've used it in other files)
    }
    return <button onClick={onLoginButtonClickHandler} id={LoginButtonStyles.LoginButton}>
                Login
                <img id={LoginButtonStyles.Icon} alt="Spotify Icon" src="/images/button-icon.png"/>
        </button>
}