
// Materialize JS
$(document).ready(function () {
  $('.collapsible').collapsible();
});

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


$('.addList-btn').on('click', function(){


  var listName = $('.newListName').val().trim()

  if(listName!==""){

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



