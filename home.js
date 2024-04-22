document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.addpage__form');
  const submitBtn = document.getElementById('submitBtn');
  const cardsContainer = document.querySelector('.cards');

  // Function to handle form submission
  function handleSubmit(event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Get form input values
      const model = document.getElementById('addpage__form__model').value;
      const type = document.getElementById('addpage__form__type').value;
      const img = document.getElementById('addpage__form__img').value;
      const serfiyyat = document.getElementById('addpage__form__rasxod').value;
      const gearbox = document.getElementById('addpage__form__gearbox').value;
      const yer = document.getElementById('addpage__form__yer').value;
      const price = document.getElementById('addpage__form__price').value;

      // Create a new car object
      const newCar = {
          model: model,
          type: type,
          img: img,
          serfiyyat: serfiyyat,
          gearbox: gearbox,
          yer: yer,
          price: price
      };

      // Get existing cars from local storage or initialize an empty array
      const existingCars = JSON.parse(localStorage.getItem('cars')) || [];

      // Add the new car to the existing cars array
      existingCars.push(newCar);

      // Save the updated cars array back to local storage
      localStorage.setItem('cars', JSON.stringify(existingCars));

      // Display the newly added car
      displayCar(newCar);

      // Clear form fields after submission
      form.reset();
  }

  // Function to display a single car
  function displayCar(car) {
      const newCarHTML = `
          <div class="card" data-id="${cardsContainer.children.length + 1}">
              <div class="cardHead">
                  <div class="cardHead-left">
                      <h3 class="carName">${car.model}</h3>
                      <p class="carType">${car.type}</p>
                  </div>
                  <div class="cardHead-right">
                      <a class="addToWishlist" href="" onclick=""><i class="fa-regular fa-heart"></i></a>
                  </div>
              </div>
              <img class="carImage" src="${car.img}" alt="">
              <div class="cardCenter">
                  <p class="carSerfiyyat"><i class="fa-solid fa-gas-pump"></i>${car.serfiyyat}L</p>
                  <p class="carGearbox">${car.gearbox}</p>
                  <p class="carSeats"><i class="fa-solid fa-users"></i>${car.yer} People</p>
              </div>
              <div class="cardEnd">
                  <p class="carPrice"><span>$${car.price}/</span>day</p>
                  <button>Rent Now</button>
              </div>
          </div>
      `;
      cardsContainer.insertAdjacentHTML('beforeend', newCarHTML);
  }

  // Check if there are any cars stored in local storage and display them
  const storedCars = JSON.parse(localStorage.getItem('cars'));
  if (storedCars) {
      storedCars.forEach(car => {
          displayCar(car);
      });
  }

  // Event listener for form submission
  submitBtn.addEventListener('click', handleSubmit);
});


// // Function to handle adding a car to the wishlist
// function addToWishlist(event) {
//   event.preventDefault(); // Prevent default link behavior
//   const card = event.target.closest('.card'); // Find the closest card element
//   const carName = card.querySelector('.carName').textContent; // Extract car name
//   const carType = card.querySelector('.carType').textContent; // Extract car type
//   const carPrice = card.querySelector('.carPrice span').textContent; // Extract car price

//   // Create a new row for the wishlist table
//   const newRow = document.createElement('tr');
//   newRow.innerHTML = `
//       <td>${carName}</td>
//       <td>${carType}</td>
//       <td>${carPrice}</td>
//       <td><button onclick="removeFromWishlist(event)">Remove</button></td>
//   `;

//   // Append the new row to the wishlist table
//   const wishlistTable = document.getElementById('wishlistBody');
//   wishlistTable.appendChild(newRow);

//   // Refresh the wishlist display
//   refreshWishlistDisplay();
// }

// // Function to handle removing a car from the wishlist
// function removeFromWishlist(event) {
//   event.preventDefault(); // Prevent default button behavior
//   const row = event.target.closest('tr'); // Find the closest row element
//   row.remove(); // Remove the row from the wishlist table

//   // Refresh the wishlist display
//   refreshWishlistDisplay();
// }

// // Function to refresh the wishlist display
// function refreshWishlistDisplay() {
//   const wishlistTable = document.getElementById('wishlistBody');
//   const wishlistRows = wishlistTable.querySelectorAll('tr');
//   if (wishlistRows.length === 0) {
//       wishlistTable.innerHTML = '<tr><td colspan="4">No items in wishlist</td></tr>';
//   }
// }

// // Event delegation for dynamically added heart icons
// document.addEventListener('click', function(event) {
//   if (event.target.classList.contains('fa-heart')) {
//       addToWishlist(event);
//   }
// });
