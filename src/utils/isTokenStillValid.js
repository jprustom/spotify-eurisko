export default function isTokenStillValid(tokenExpiryDate){
    return Math.round(Date.now()/1000)<tokenExpiryDate
}