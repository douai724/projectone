// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Uodpg52AmFYO-fGfpXUcm5C5bpm6rJk",
  authDomain: "project-recover-4d181.firebaseapp.com",
  projectId: "project-recover-4d181",
  storageBucket: "project-recover-4d181.firebasestorage.app",
  messagingSenderId: "661946408106",
  appId: "1:661946408106:web:283265da09fe35571ac4d3",
  measurementId: "G-05ZTR34NN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Google login function
async function googleLogin() {
    const provider = new GoogleAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        document.getElementById('content').innerHTML += `<p>Hello ${user.displayName}</p>`;
        console.log(user);
    } catch (error) {
        console.error("Error during Google sign-in:", error);
    }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", async () => {
    console.log(app);

    // Add click handler to login button
    document.getElementById('loginButton').addEventListener('click', googleLogin);

    // Get document reference
    const postRef = doc(db, 'posts', 'firstpost');

    try {
        const docSnap = await getDoc(postRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('content').innerHTML += `${data.title}<br>${data.createdAt}`;
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
});