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

  $('#viewKoalas').on('click', '.transferBtn', updateKoala);
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

function updateKoala(){
  // console.log('SAVE THE KOALAS THEY CANNOT SAVE THEMSELVES');
  //variable to pull out data from koala object: 

  let koala = $(this).closest("tr").data("koala");
  let id = koala.id;

  // console.log(koala, id);

  //ajax PUT request to send ID and transfer status:

  $.ajax({
    url: `/koalas/${id}`,
    method: 'PUT',
    data: {
      transferStatus: koala.ready_to_transfer
    }
  }).then(function (response){
    console.log('UPDATED KOALA');
    getKoalas();
  }).catch(function (err){
    console.log('EVERYTHING BROKE WHEN COMING BACK FROM UPDATE: ', err);
  });
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
        <td>${koala.ready_to_transfer}<button class="transferBtn">Toggle Transfer</button></td>
        <td>${koala.notes}</td>
      </tr>
      `)

      //Create conditional that adds ready to transfer button
      // if (koala.ready_to_transfer === false) {
      //   // $('.transfer').append(`
      //   // <button class="transferBtn">Ready to Transfer</button>
      //   // `)
      //   // $('.transfer').empty();
      //   // $('.transfer').append(`<td>${koala.ready_to_transfer}<button class="transferBtn">Ready To Transfer</button></td>`)

      //   console.log('there should be 2 of these logs');
      // }


    row.data('koala', koala);
    $('#viewKoalas').append(row);
    }
}
