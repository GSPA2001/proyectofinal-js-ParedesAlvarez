console.log("Holaa 👋🏼, esta 🥁🥁🥁 es 🥁 la entrega final");
//Este formulario para realizar la reserva
document.addEventListener('DOMContentLoaded', function() {
  const formReserva = document.querySelector('#formReserva');
  const inputNombre = document.querySelector('#nameInput');
  const inputEdad = document.querySelector('#edadInput');
  const inputFecha = document.querySelector('#fechaInput');
  const inputHorario = document.querySelector('#horarioInput');
  const inputTelefono = document.querySelector('#phone');
  const inputPersona = document.querySelector('#persona');

  function restoreFormValues() {
    const reservaGuardada = localStorage.getItem('reserva');
    if (reservaGuardada) {
      const reserva = JSON.parse(reservaGuardada);
      inputNombre.value = reserva.nombre;
      inputEdad.value = reserva.edad;
      inputFecha.value = reserva.fecha;
      inputHorario.value = reserva.horario;
      inputTelefono.value = reserva.telefono;
      inputPersona.value = reserva.persona;
    }
  }

  function guardarReserva() {
    const nombre = inputNombre.value;
    const edad = inputEdad.value;
    const fecha = inputFecha.value;
    const horario = inputHorario.value;
    const telefono = inputTelefono.value;
    const persona = inputPersona.value;
    const reserva = {
      nombre,
      edad,
      fecha,
      horario,
      telefono,
      persona
    };

    localStorage.setItem('reserva', JSON.stringify(reserva));
  }

  function limpiarReserva() {
    formReserva.reset();
    inputNombre.value = '';
    inputEdad.value = '';
    inputFecha.value = '';
    inputHorario.value = '';
    inputTelefono.value = '';
    inputPersona.value = '';
  }

  restoreFormValues();

  formReserva.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!inputNombre.value || !inputEdad.value || !inputFecha.value || !inputHorario.value || !inputTelefono.value || !inputPersona.value) {
      Swal.fire({
        icon:'warning',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos de la reserva!',
        showConfirmButton: false,
        timer: '1500'
      })
      //alert('Por favor, completa todos los campos de la reserva.');
      return;
    }

    guardarReserva();
    restoreFormValues();
    
    Swal.fire(
      '¡Reserva realizada con éxito!',
      `Nombre: ${inputNombre.value}\nFecha: ${inputFecha.value}\nHorario: ${inputHorario.value}\nPersonas: ${inputPersona.value}`,
      'success'
    )
    //alert(`¡Reserva realizada con éxito!\n\nNombre: ${inputNombre.value}\nFecha: ${inputFecha.value}\nHorario: ${inputHorario.value}\nPersonas: ${inputPersona.value}`);
  });

  const formResetBtn = document.querySelector('#formReset');
  formResetBtn.addEventListener('click', limpiarReserva);

  
  window.addEventListener('load', limpiarReserva);
});