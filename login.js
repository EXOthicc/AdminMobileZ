import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout
} from './ui.js'
 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js';

var _user;

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAjMWj2li6n0ZM6SXfH1lXzSLq7sesO2ik",
    authDomain: "nangkring-bang.firebaseapp.com",
    projectId: "nangkring-bang",
    storageBucket: "nangkring-bang.appspot.com",
    messagingSenderId: "724512205413",
    appId: "1:724512205413:web:15d6d1e08675bcc3bdf48c",
    measurementId: "G-4FY8RW11ER"
});


// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  // step 1: try doing this w/o error handling, and then add try/catch

  //masuk bisa dapet UIDnya
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log("id", user.uid);
      console.log("email", user.email);
    }
  })
  

  // step 2: add error handling
  // try {
  //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  // }
  // catch(error) {
  //   console.log(`There was an error: ${error}`)
  //   showLoginError(error)
  // }
}

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((user) =>{
      console.log('User ', user.user.email);
      db.collection('users').add({
        user_type: 'admin',
        user_email: user.user.email,
        user_register: firebase.firestore.FieldValue.serverTimestamp(),
        user_alamat: '',
        user_img: '',
        user_nama: user.user.email,
        user_telp:'',
        user_username: user.user.email
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = "./dashboard.html"; 
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    })
    
    
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log("NEWid", user.uid);
        console.log("NEWemail", user.email);//success
        //[]isi collection users dengan UID dan email ini
      }
    })
    

  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Monitor auth state
/*
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      //hideLinkError()

      if (window.location.href.indexOf("index.html") > -1){                 //kalo page login
        window.location.href = "./dashboard.html";                              //ke page dashboard
      }
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
      if ((window.location.href.indexOf("index.html") > -1) == false) {     //kalo bukan page login
        window.location.href = "./index.html";                              //ke page login
      }  
    }
  })
}
*/

// Log out
const logout = async () => {
  window.location.href = "./index.html";
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
//connectAuthEmulator(auth, "http://localhost:9099");

//auth guard(?)
/*
const authGuard = async() => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      //hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}
*/

//monitorAuthState();
console.log(firebase.firestore.Timestamp.fromDate(new Date()));

$(document).ready(function () {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      window._user = auth.currentUser.email;//[]
      console.log(auth.currentUser.email);
      showApp()
      showLoginState(user)

      hideLoginError()
      //hideLinkError()

      if (window.location.href.indexOf("index.html") > -1){                 //kalo page login
        window.location.href = "./dashboard.html";                              //ke page dashboard
      }
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
      if ((window.location.href.indexOf("index.html") > -1) == false) {     //kalo bukan page login
        window.location.href = "./index.html";                              //ke page login
      }  
    }
  })
});