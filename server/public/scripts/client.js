console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

//Click listeners 
function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

//Gets Koala data 
function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
    $.ajax({
      type: 'GET',
      url: '/koalas'
    }).then(function(response) {
      console.log(response);
      render(response);
    }).catch(function(err){
      console.log('error in GET', err);
    });
  
} // end getKoalas

//Add new Koala 
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala, 
  }).then(function(response){
    console.log('Response from sever', response);
    getKoalas();
  }).catch(function(err){
    console.log('Error in POST', err);
  })
}

//renders to the DOM 
function render(koalas){
  $('#viewKoalas').empty();
    for(let koala of koalas){

      let row = $(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td class="transfer">${koala.ready_to_transfer}</td>
        <td>${koala.notes}</td>
      </tr>
      `)

      //Create conditional that adds ready to transfer button

      if (koala.ready_to_transfer === false) {

      }


    row.data('koala', koala);
    $('#viewKoalas').append(row);
    }
}