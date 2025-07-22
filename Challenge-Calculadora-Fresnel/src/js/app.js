const showToast = (typeToast, message, title) => {
  toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
  
  };

  switch(typeToast){
    case 'success':
      toastr.success(message, title);
      break

    case 'error':
      toastr.error(message, title);      
      break

  };

};

const calculate = (event) => {
  try{
    event.preventDefault();
  
    let frequency = parseFloat(document.getElementById('input-frequency').value);
    let distance = parseFloat(document.getElementById('input-distance').value);
    let containerForm = document.getElementById('container-form');
    let titleForm = document.querySelector('.title-form');
    let containerResults = document.createElement('div');
  
    if((distance === 0 || distance < 0)|| (frequency === 0 || frequency < 0)){
      showToast('error', 'Caracteres ingresados inválidos.', 'Datos no válidos');
      
      throw new Error('Caracteres no válidos');
  
    }else if(isNaN(distance) || isNaN(frequency)){
      showToast('error', 'Caracteres ingresados inválidos.', 'Datos no válidos');
      
      throw new Error('Caracteres no válidos');

    };
  
    let result = (8.656 * Math.sqrt(distance / frequency)).toFixed(4);
  
    containerForm.innerHTML = '';
    containerForm.classList.add('d-flex', 'justify-content-center', 'align-items-center');
    containerForm.style.minHeight = '370px';

    let bodyContent = `
      <div class="d-flex justify-content-center align-items-center">
        <div class="row mt-2">
          <h4 class="title text-center">Resultados<hr></h4>
          <p class="text-center mt-5">El <b>Radio</b> es de: ${result} <sup>mts<sup></p>      
        </div>
      </div>
      <div class="text-center" style="margin-top: 100px;">
        <p><b>Importante</b>: Este radio te indica el área alrededor de la línea de visión entre el transmisor y el receptor donde no deberían haber obstáculos para evitar pérdida de calidad en la señal.</p>
      </div>

    `;
    
    containerResults.innerHTML = bodyContent;
    containerResults.style.height = '500px';
    
    titleForm.style.display = 'none';
    containerForm.appendChild(containerResults);

  }catch(error){
    console.error(error);

  };
  
};