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


// variables for reference
let currentUser = null
let user = firebase.auth().currentUser
let ref = firebase.database().ref()
let userRef = ref.child("users")
let onComplete = function(error) {
    if (error) {
        console.log('Operation failed');
    } else {
        console.log(' Operation completed');
    }
};


// this function runs on page load, sets the current user's email in db to the one they just logged in with
initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            let username = user.email.split('@')[0]
            userRef.child(username).set({
                email: user.email

            }, onComplete); 
        }
    })
}

window.addEventListener('load', function () {
    initApp()
})


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

// Create New Board
$('.addboard-btn').on('click', function(){
    $('.board-form').css('visibility', 'visible')
    $('.addboard-btn').css('visibility', 'hidden')
})


// Add Boards
$('.create-btn').on('click', function () {
    event.preventDefault()
    var boardName = $('.newBoardName').val().trim()

    if (boardName !== "" && boardName.length <= 40) {
        $('#myUL').append(`
           <li class="collection-item ${boardName}"><a href="#!" class ="homeBoardTitle"><span class="badge"><i class="small material-icons waves-effect delete-btn"
              data-id="${boardName}">delete</i></span>
          ${boardName}</a></li>
          `)
        $('.newBoardName').val('')
        $('.addboard-btn').css('visibility', 'visible')
        $('.board-form').css('visibility', 'hidden')
        
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

// Modal
$(document).ready(function(){
    $('.modal').modal();
  });