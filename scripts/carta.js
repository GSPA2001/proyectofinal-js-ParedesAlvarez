console.log("Holaa 👋🏼, esta 🥁🥁🥁 es 🥁 la entrega final");
//El boton calcular presupuesto me permite, eso mismo
class Plato {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 0;
  }
}

const listaPlatos = [
  new Plato('Tamales', 600),
  new Plato('Ceviche', 2800),
  new Plato('Ceviche Mixto', 3500),
  new Plato('Pollo Dorado', 1200),
  new Plato('Chaufa Veggie', 1500),
  new Plato('Chaufa', 2000),
  new Plato('Lomo Saltado', 2300),
  new Plato('Cabrito', 2500),
  new Plato('Chaufa con Rabas', 3200),
  new Plato('Rabas', 3500),
  new Plato('Arroz con Mariscos', 3800),
  new Plato('Jalea de Mariscos', 3900)
];

function crearListaPlatos() {
  const listaPlatosEl = document.querySelector('#lista-platos');
  listaPlatos.forEach(plato => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="addNumber_cont">
        <div class="button-container">
          <div class="remove-btn">-</div>
          <div class="quantity-value">0</div>
          <div class="add-btn">+</div>
        </div>
      </div>
      <span>${plato.nombre.toUpperCase()} - $${plato.precio}</span>
    `;
    const quantityValueEl = li.querySelector('.quantity-value');
    const addBtnEl = li.querySelector('.add-btn');
    const removeBtnEl = li.querySelector('.remove-btn');

    addBtnEl.addEventListener('click', () => {
      plato.cantidad++;
      quantityValueEl.textContent = plato.cantidad;
    });

    removeBtnEl.addEventListener('click', () => {
      if (plato.cantidad > 0) {
        plato.cantidad--;
        quantityValueEl.textContent = plato.cantidad;
      }
    });

    listaPlatosEl.appendChild(li);
  });
}

function calcularPresupuesto() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const platosSeleccionados = listaPlatos.filter(plato => plato.cantidad > 0);
      const presupuestoTotal = platosSeleccionados.reduce((total, plato) => total + plato.precio * plato.cantidad, 0);
      const resultadoPresupuestoEl = document.querySelector('#resultado-presupuesto');
      resultadoPresupuestoEl.textContent = `$${presupuestoTotal.toFixed(2)}`;

      const platosSeleccionadosContainer = document.querySelector('#platos-seleccionados');
      platosSeleccionadosContainer.innerHTML = '';

      platosSeleccionados.map(plato => {
        const platoEl = document.createElement('div');
        platoEl.textContent = `${plato.nombre} - Cantidad: ${plato.cantidad}`;
        platosSeleccionadosContainer.appendChild(platoEl);
      });

      resolve();
    }, 225);
  });
}

function limpiarPresupuesto() {
  listaPlatos.forEach(plato => {
    plato.cantidad = 0;
  });

  const resultadoPresupuestoEl = document.querySelector('#resultado-presupuesto');
  resultadoPresupuestoEl.textContent = '$0.00';

  const quantityEls = document.querySelectorAll('.quantity-value');
  quantityEls.forEach(quantityEl => {
    quantityEl.textContent = '0';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  crearListaPlatos();

  const btnLimpiarPresupuestoEl = document.querySelector('#btn-limpiar-presupuesto');
  btnLimpiarPresupuestoEl.addEventListener('click', limpiarPresupuesto);

  const btnCerrarCuadroFlotanteEl = document.querySelector('#btn-cerrar-cuadro-flotante');
  btnCerrarCuadroFlotanteEl.addEventListener('click', () => {
    const cuadroFlotanteEl = document.querySelector('#cuadro-flotante');
    cuadroFlotanteEl.classList.add('oculto');
  });

  const btnPresupuestoEl = document.querySelector('#btn-presupuesto');
  btnPresupuestoEl.addEventListener('click', () => {
    const cuadroFlotanteEl = document.querySelector('#cuadro-flotante');
    cuadroFlotanteEl.classList.remove('oculto');
    calcularPresupuesto();
  });

  const btnCalcularPresupuestoEl = document.querySelector('#btn-calcular-presupuesto');
  btnCalcularPresupuestoEl.addEventListener('click', () => {
    calcularPresupuesto()
      .then(() => {
        console.log('Presupuesto calculado exitosamente');
      })
      .catch(error => {
        console.error('Error al calcular el presupuesto:', error);
      });
  });
});