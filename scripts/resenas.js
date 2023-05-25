console.log("Holaa 👋🏼, esta 🥁🥁🥁 es 🥁 la entrega final");
// enlace al archivo reviews.json
const reviewsURL = '../data/reviews.json';

// Este formulario para realizar la reseña
function updateReviews(reviews) {
  const reviewContainer = document.querySelector('#reviewContainer');
  reviewContainer.innerHTML = '';

  reviews.forEach(function(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = review.name;

    const reviewParagraph = document.createElement('p');
    reviewParagraph.textContent = review.review;

    const ratingParagraph = document.createElement('p');
    ratingParagraph.textContent = `Calificación: ${review.rating} estrellas`;

    reviewDiv.appendChild(nameParagraph);
    reviewDiv.appendChild(reviewParagraph);
    reviewDiv.appendChild(ratingParagraph);

    reviewContainer.appendChild(reviewDiv);
  });
}

async function obtenerReseñas() {
  try {
    const response = await fetch(reviewsURL);
    const data = await response.json();
    updateReviews(data);
  } catch (error) {
    console.log('Error al obtener las reseñas:', error);
  }
}

const reviewForm = document.querySelector('#review-form');
const ratingInputs = document.querySelectorAll('.rating input');

reviewForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.querySelector('#nameInput').value;
  const email = document.querySelector('#emailInput').value;
  const review = document.querySelector('#reviewInput').value;
  const ratingInput = document.querySelector('.rating input:checked');
  const rating = ratingInput ? ratingInput.value : '';

  /*if (!name || !email || !review || !rating) {
    alert('Por favor, completa todos los campos del formulario.');
    return;
  }*/
  if (!name || !email || !review || !rating) {
    setTimeout(function() {
      Toastify({
        text: "Por favor, completa todos los campos del formulario.",
        gravity: "top",
        position: "center",
        style: {
          background: "rgba(255, 92, 92, 0.757)"
        }
      }).showToast();
    }, 100);
    return;
  }

  const reviewData = { name, email, review, rating };

  let storedReviews = localStorage.getItem('reviewData');
  storedReviews = storedReviews ? JSON.parse(storedReviews) : [];

  storedReviews = [...storedReviews, reviewData];

  localStorage.setItem('reviewData', JSON.stringify(storedReviews));

  updateReviews(storedReviews);

  reviewForm.reset();
  //alert('¡Reseña enviada con éxito! ¡Muchas gracias! Tu opinión nos ayuda a mejorar.');
  Swal.fire({
    background: 'rgb(255, 235, 122)',
    color: '#f08ff',
    title: '¡Excelente!',
    text: '¡Reseña enviada con éxito! ¡Muchas gracias! Tu opinión nos ayuda a mejorar.',
    showConfirmButton: false,
    timer: 1650
  });
});

let storedReviews = localStorage.getItem('reviewData');
storedReviews = storedReviews ? JSON.parse(storedReviews) : [];
updateReviews(storedReviews);
obtenerReseñas();

document.addEventListener('DOMContentLoaded', obtenerReseñas);