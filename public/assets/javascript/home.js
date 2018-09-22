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
let ref = firebase.database().ref()
let userRef = ref.child("users")
let onComplete = function (error) {
    if (error) {
        console.log('Operation failed');
    } else {
        console.log(' Operation completed');
    }
};
//sets current user's username and email
initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user
            let username = user.email.split('@')[0]
            userRef.child(username).set({
                email: user.email
            }, onComplete);
        }
    })
}
//runs on page load
window.addEventListener('load', function () {
    initApp()
})

// on click, grabs
$('#addButton').on('click', function () {
    currentUser = firebase.auth().currentUser
    if (currentUser) {
        let boardRef = userRef.child(currentUser.email.split('@')[0]).child("boards")
        const newBoardName = document.querySelector("#input_text").value
        console.log(newBoardName)
        boardRef.child(newBoardName).set({
            boardname: newBoardName
        }, onComplete)
    }
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
    $('.theme-imgs').empty()
    $("#themeChoices").val("TaskWell")
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

$(document).ready(function () {
    $('select').formSelect();
});

// Theme Img API

$('.theme-btn').on('click',function(){
    event.preventDefault()
    $('.theme-imgs').empty()
    var themeName = $('#themeChoices :selected').text() + " color"
    console.log(themeName)

    var data = {
        url: `http://api.pexels.com/v1/search?query=${themeName}+query&per_page=9&page=1`,
        headers: {
            'Authorization': '563492ad6f917000010000010c85c058ec9a487f8c9048dbce19cc42'
        }
    }

    $.get(data)
        .then(function (r) {
            console.log(r)
            
            r.photos.forEach(photo => {
                var randompic = photo.src.landscape
                $('.theme-imgs').append(`
            <div class="col s4">
            <img style="height:200px ;width:200px; margin:5px"src="${randompic}" alt="" class="theme-img">
            </div>
            `)
            });
        });
})

// Storing Theme Img
$(document).on('click', '.theme-img', function(){
    event.preventDefault()
    
    var themeImgURL = $(this).attr('src')
    
    console.log(themeImgURL)


    $('.theme-imgs').empty()

    $('.theme-imgs').append(`
            <div class="col s4">
            <img style="height:200px ;width:200px; margin:5px"src="${themeImgURL}" alt="" class="theme-img">
            </div>
            `)

    // $('body').css('background-image', `url('${themeImgURL}')`)
})


// Clear Create Board Button

$('.create-cancel-btn').on('click',function(){
    $('.addboard-btn').css('visibility', 'visible')
    $('.board-form').css('visibility', 'hidden')
})
