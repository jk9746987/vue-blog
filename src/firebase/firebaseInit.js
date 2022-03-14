import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBItzXmtjKHhZp63bfI0K0eUwz1I2ZJ_JE",
    authDomain: "vue-blog-6cd21.firebaseapp.com",
    projectId: "vue-blog-6cd21",
    storageBucket: "vue-blog-6cd21.appspot.com",
    messagingSenderId: "305176374181",
    appId: "1:305176374181:web:01088631fc2c9efb3fd64c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
console.log(firebaseApp)
export {timestamp}
export default firebaseApp.firestore();