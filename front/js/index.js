// Validación en front




//registro

$('#registerbtn').on('click', function(){

  return

  let nombre = $('#nombre').val()
  let apellido = $('#apellido').val()
  let casa = $('#numCasa').val()
  let email = $('#email').val()
  let password = $('#password').val()

  json_to_send = {
    "nombre": nombre,
    "casa": casa,
    "apellido": apellido,
    "correo": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'http://localhost:3001/register',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Usuario creado con exito");
      console.log('success: '+ data);
      window.setTimeout(function(){
        // Move to a new location or you can do something else
        window.location.href = './index.html';
    }, 5000);
    },
    error: function(error_msg) {
      console.log(error_msg.responseJSON['Error'])
      alert((error_msg.responseJSON['Error']));
    }
  });
});

/*
//login
$('#loginbtn').on('click', function(){
  let email = $('#email_log').val()
  let password = $('#pass_log').val()

  json_to_send = {
    "correo": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send)
  console.log(json_to_send)
  $.ajax({
    url: 'http://localhost:3001/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      localStorage.setItem('token', data.token)
      alert("Sesion Iniciada")
      window.location = './home.html'
    },
    error: function(error_msg) {
      alert((error_msg["responseText"]))
    }
  })
})
*/

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});