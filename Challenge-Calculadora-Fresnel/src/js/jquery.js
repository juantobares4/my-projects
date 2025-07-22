$(document).ready(function(){
  $('#container-main-content').load('public/pages/home.html');
  
  $(document).on('click', '#show-calculator-form', function(event) {
    event.preventDefault();
    document.title = 'Calculadora Fresnel | Calculadora';

    $('#container-main-content').load('public/pages/calculator.html');
  
  });

  $(document).on('click', '#btn-start-calculating', function(event) {
    event.preventDefault();
    
    $('#container-main-content').load('public/pages/calculator.html');
  
  });

  $(document).on('click', '#help', function(event){
    event.preventDefault();
    document.title = 'Calculadora Fresnel | Ayuda';

    $('#container-main-content').load('public/pages/help.html');

  });

});
