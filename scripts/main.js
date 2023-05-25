console.log("Holaa 👋🏼, esta 🥁🥁🥁 es 🥁 la entrega final");
//Este formualrio para relaizar el pedido take away
const resultadoPresupuesto = document.getElementById('resultado-presupuesto');
const formTlleve = document.getElementById('formTlleve');
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const btnCalcularPresupuesto = document.getElementById('btn-calcular-presupuesto');
const nameInput = document.getElementById('nameInput');
const fechaInput = document.getElementById('fechaInput');
const horarioInput = document.getElementById('horarioInput');
const phoneInput = document.getElementById('phone');
const formReset = document.getElementById('formReset');
const btnPedir = document.getElementById('btn-pedir');

menuButton.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

btnCalcularPresupuesto.addEventListener('click', (event) => {
  event.preventDefault();
  calcularPresupuesto();
});

formReset.addEventListener('click', () => {
  limpiarFormulario();
});

btnPedir.addEventListener('click', (event) => {
  event.preventDefault();
  if (validarFormulario()) {
    guardarPedido();
    Swal.fire({
      background:'rgba(177, 255, 164, 0.819)',
      color:'#f08ff',
      title: 'Excelente',
      text: '¡Pedido realizado con éxito! Nos vemos.',
      showConfirmButton: false,
      timer: 1600
    })
    //alert('¡Pedido realizado con éxito!');
  } else {
    Swal.fire({
      background:'rgba(255, 190, 190, 0.757)',
      color:'#f08ff',
      title: 'Oops...',
      text: 'Por favor, completa todos los campos del pedido!',
      showConfirmButton: false,
      timer: 1600
    })
    //alert('No se puede realizar el pedido. Por favor, completa todos los campos del formulario.');
  }
});

function guardarPedido() {
  const platosSeleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox) => {
    const platoId = checkbox.id;
    const cantidadPlatos = parseInt(checkbox.parentElement.querySelector('input[type="number"]').value);
    return { platoId, cantidad: cantidadPlatos };
  });

  const pedido = {
    nombre: nameInput.value,
    fecha: fechaInput.value,
    horario: horarioInput.value,
    telefono: phoneInput.value,
    presupuesto: resultadoPresupuesto.textContent,
    platos: platosSeleccionados
  };

  localStorage.setItem('pedido', JSON.stringify(pedido));
}

function cargarPedidoGuardado() {
  const pedidoGuardado = localStorage.getItem('pedido');
  if (pedidoGuardado) {
    const pedido = JSON.parse(pedidoGuardado);
    nameInput.value = pedido.nombre;
    fechaInput.value = pedido.fecha;
    horarioInput.value = pedido.horario;
    phoneInput.value = pedido.telefono;
    mostrarPresupuesto(pedido.presupuesto);
    mostrarPlatosSeleccionados(pedido.platos);
  }
}

function mostrarPresupuesto(presupuesto) {
  resultadoPresupuesto.textContent = presupuesto;
}

function mostrarPlatosSeleccionados(platos) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    const platoId = checkbox.id;
    const plato = platos.find((plato) => plato.platoId === platoId);
    if (plato) {
      checkbox.checked = true;
      const cantidadInput = checkbox.parentElement.querySelector('input[type="number"]');
      cantidadInput.value = plato.cantidad;
    }
  });
}

function calcularPresupuesto() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let total = 0;


  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const price = parseInt(checkbox.dataset.price);
      const cantidadInput = checkbox.parentElement.querySelector('input[type="number"]');
      const cantidad = parseInt(cantidadInput.value);
      total += price * cantidad;
    }
  });

  mostrarPresupuesto(total);
}

function limpiarFormulario() {
  formTlleve.reset();
  mostrarPresupuesto(0);
  limpiarFormularioVisualmente();
}

function limpiarFormularioVisualmente() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    const cantidadInput = checkbox.parentElement.querySelector('input[type="number"]');
    cantidadInput.value = 0;
  });

  nameInput.value = '';
  fechaInput.value = '';
  horarioInput.value = '';
  phoneInput.value = '';
}

function validarFormulario() {
  if (nameInput.value === '' || fechaInput.value === '' || horarioInput.value === '' || phoneInput.value === '') {
    return false;
  }
  return true;
}

window.addEventListener('load', () => {
  cargarPedidoGuardado();
  limpiarFormularioVisualmente();
});