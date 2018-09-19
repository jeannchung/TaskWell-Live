// Home Java Script

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



initApp = function () {
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var uid = user.uid;
          var phoneNumber = user.phoneNumber;
          var providerData = user.providerData;
          user.getIdToken().then(function (accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('sign-in').textContent = 'Sign out';
              document.getElementById('account-details').textContent = JSON.stringify({
                  displayName: displayName,
                  email: email,
                  emailVerified: emailVerified,
                  phoneNumber: phoneNumber,
                  photoURL: photoURL,
                  uid: uid,
                  accessToken: accessToken,
                  providerData: providerData
              }, null, '  ');
          });
      } else {
          // User is signed out.
          document.getElementById('sign-in-status').textContent = 'Signed out';
          document.getElementById('sign-in').textContent = 'Sign in';
          document.getElementById('account-details').textContent = 'null';
      }
  }, function (error) {
      console.log(error);
  });
};

window.addEventListener('load', function () {
  initApp()
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  
// Styles JS
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});

$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});


// Add Boards
$('.addboard-btn').on('click', function () {
    var boardName = $('.newBoardName').val().trim()

    if (boardName !== "" && boardName.length <= 40) {
        $('#myUL').append(`
           <li class="collection-item ${boardName}"><a href="#!" class="collection-item Work"><span class="badge"><i class="small material-icons waves-effect delete-btn"
              data-id="${boardName}">delete</i></span>
          ${boardName}</a></li>
          `)
        $('.newBoardName').val('')
    }

})

//Deleting Boards 
$(document).on('click', '.delete-btn', function () {
    var dataId = $(this).attr('data-id')
    $('.collection-item.' + dataId).remove()

})

//SEARCH BOARDS
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}