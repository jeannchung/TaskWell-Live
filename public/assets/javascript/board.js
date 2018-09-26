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

let ref = firebase.database().ref()
let usersRef = ref.child("users")
let onComplete = function (error) {
  if (error) {
    console.log('Operation failed');
  } else {
    console.log(' Operation completed');
  }
};


// dynamically change name of .board-title on load
// populate page with items from db on load
// adding items to board also adds to db
// deleting items from board also deletes from db
// how to grab name of board that user is currently in???

window.onload = function() {
  // currentUser = firebase.auth().currentUser
  // if (currentUser) {
  //   let boardsRef = usersRef.child(currentUser.email.split('@')[0]).child("boards")
  //   boardsRef.on("child_added", function (snapshot) {
  //     let newBoard = snapshot.val()
  //     document.querySelector('#board-title').innerHTML = String(newBoard)
  //   })
  // }

  currentUser = firebase.auth().currentUser
  if (currentUser) {
    let boardsRef = usersRef.child(currentUser.email.split('@')[0]).child("boards")
    boardsRef.orderByChild("boardname/").on('value', function (snapshot) {
      console.log(snapshot.val())
      snapshot.forEach(function (childSnapShot) {
        var key = childSnapShot.key
        var childData = childSnapShot.val()

        console.log(childData.val().boardname)
      })
    })
  }
}



document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});
$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
});


$('.addList-btn').on('click', function () {
  var listName = $('.newListName').val().trim()

  if (listName !== "") {
    $('table').append(`
      <tr class="${listName}">
      <td>${listName}</td>
      <td><input type="date"></td>
      <td><i class="small material-icons waves-effect delete-btn" data-id="${listName}">delete</i></td>
      <td>
      <label>
      <input type="checkbox" />
      <span></span>
      </label>
      </td>
      </tr>
    `)
    $('.newListName').val('')
  }
})

//Deleting Boards 
$(document).on('click', '.delete-btn', function () {
  var dataId = $(this).attr('data-id').split(' ').join('.')
  $('.' + dataId).remove()

})



// Local Storage Board Name and theme Img
var boardName = localStorage.getItem('BoardName')
$('#board-title').html(boardName)


firebase.auth().onAuthStateChanged(function () {
  currentUser = firebase.auth().currentUser
  let boardsRef = usersRef.child(currentUser.email.split('@')[0]).child(`boards/${boardName}`)

  boardsRef.on('value',function(data){
    var themeImg = data.val().themeImg

    $('body').css('background-image',`url("${themeImg}")`)
    
  })
})