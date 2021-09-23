import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCXyTY0sLoxvmM5knzWaM3ddy_P48H4IQs",
    authDomain: "slack-clone-b2c6d.firebaseapp.com",
    projectId: "slack-clone-b2c6d",
    storageBucket: "slack-clone-b2c6d.appspot.com",
    messagingSenderId: "634629007911",
    appId: "1:634629007911:web:8b3dc0963b64280a3d3c02",
    measurementId: "G-X7CGTT73PR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db;