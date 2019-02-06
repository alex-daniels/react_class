import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCii5nuXQ5tZmAB7EkBGmFwofMRgEMSIqk",
    authDomain: "learning-react-cotd-ad.firebaseapp.com",
    databaseURL: "https://learning-react-cotd-ad.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

//this is a named export 
export { firebaseApp };

//this is a default export
export default base;