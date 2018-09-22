// Initialize Firebase
var config = {
    apiKey: "AIzaSyCG_jjezg8ta2ihiDEmWYdG7PdCkFlwk8o",
    authDomain: "taskwell-f8bae.firebaseapp.com",
    databaseURL: "https://taskwell-f8bae.firebaseio.com",
    projectId: "taskwell-f8bae",
    storageBucket: "taskwell-f8bae.appspot.com",
    messagingSenderId: "257454357176"
};
firebase.initializeApp(config);


var db = firebase.database()
var user = firebase.auth().currentUser;



// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: 'home.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#container', uiConfig);






