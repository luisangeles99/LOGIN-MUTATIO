//Mensajes de error registro
const errores = {
  nombre: "El campo nombre  no puede estar vacío",
  apellido: "El apellido no puede estar vacío",
  casa: "Numero de casa debe ser un número entero entre 1 y 1000",
  correo: "Verifica el formato del correo introducido",
  password: "La contraseña no puede estar vacía" 
}

//Mensajes de error login
const erroresLogin = {
  correo: "El correo no puede estar vacío",
  password: "La contraseña no puede estar vacía"
}



/*********DISPLAY ERRORES**********/

//errores registro
function displayRegisterErrors(errors) {
  cleanErrorsRegister();
  Object.keys(errors).forEach(function(key) {
    var errorSpan = document.getElementById(key+'Error');
    document.getElementById(key+'Error').innerHTML = errores[key];
    errorSpan.classList.remove('hidden');
  });
}

function errorUserExists(error) {
  cleanErrorsRegister();
  var errorSpan = document.getElementById('errorGeneralLogin');
  errorSpan.innerHTML = error['Tipo'];
  errorSpan.classList.remove('hidden');
}

function cleanErrorsRegister() {
  Object.keys(errores).forEach(function(key){
    var errorSpan = document.getElementById(key+'Error');
    errorSpan.classList.add('hidden');
  });
  errorSpan = document.getElementById('errorGeneralLogin');
  errorSpan.innerHTML = '';
  errorSpan.classList.add('hidden');
}

//errores login
function displayLoginErrors(errors) {
  cleanErrorsLogin();
  Object.keys(errors).forEach(function(key) {
    var errorSpan = document.getElementById(key+'ErrorLogin');
    document.getElementById(key+'ErrorLogin').innerHTML = erroresLogin[key];
    errorSpan.classList.remove('hidden');
  });
}

function cleanErrorsLogin(){
  Object.keys(erroresLogin).forEach(function(key){
    var errorSpan = document.getElementById(key+'ErrorLogin');
    errorSpan.classList.add('hidden');
  });
}


/*********REGISTRO Y LOGIN API**********/
//registro
$('#registerbtn').on('click', function(){

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
    success: function(ans){
      cleanErrorsRegister();
      console.log('success: '+ ans);
      alert("Usuario creado con exito!");
      window.setTimeout(function () {
        location.href = './index.html';
    }, 1000);
    },
    error: function(error_msg) {
      cleanErrorsRegister();
      console.log(error_msg['responseText']);
      if("data" in error_msg['responseJSON']) {
        displayRegisterErrors(error_msg['responseJSON'].data.errors);
      }
      else if("Error" in error_msg['responseJSON']){
        errorUserExists(error_msg['responseJSON']);
      }
      
    }
  });
});


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
      cleanErrorsLogin(); 
      // guardar token en localstorage o cookie
      //localStorage.setItem('token', data.token)
      alert("Sesion Iniciada")
      window.location = './home.html'
    },
    error: function(error_msg) {
      cleanErrorsLogin(); 
      console.log((error_msg));
      if("error" in error_msg['responseJSON']){
        alert("El correo y/o contraseña son incorrectos.");
      }
      else {
        displayLoginErrors(error_msg['responseJSON'].data.errors);
      }
    }
  })
});


/*********FUNCIONALIDAD FORM**********/
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