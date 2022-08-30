const loadPhoen = async(search, newPhone) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone( data.data, newPhone );
}

const displayPhone = (phones, newPhone) => {

    // Show All Button 
    const showAllPhone = document.getElementById('show-all');
    if(newPhone && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAllPhone.classList.remove('d-none');
    } else {
        showAllPhone.classList.add('d-none');
    }

    // Phone Not Found 
    const notFound = document.getElementById('not-found');
    if(phones.length === 0) {
        notFound.classList.remove('d-none')
    } else {
        notFound.classList.add('d-none')
    }
    // All Phone 
    const allCard = document.getElementById('all-card');
    allCard.innerHTML = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">${phone.brand}</h3>
          <h6 class="card-text">${phone.phone_name}</h6>
          <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
        `
        allCard.appendChild(div);
    });
    loadingSpinner(false);
}

const showLimitedPhone = (newPhone) => {
    loadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhoen(searchText, newPhone);
}

// Enter to Search 

document.getElementById('search-field').addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        showLimitedPhone(9);
    }
});

document.getElementById('search-btn').addEventListener('click', function () {
    showLimitedPhone(9);
});


const loadingSpinner = isTrue => {
    const isLoad = document.getElementById('spinner');
    if (isTrue) {
        isLoad.classList.remove('d-none');
    } else {
        isLoad.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function() {
    showLimitedPhone();
});

// Phone details 

const phoneDetails = async (phone) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`;
    const res = await fetch(url);
    const data = await res.json();
    modalDetails( data.data );
}

const modalDetails = modal => {
    const modalTitle = document.getElementById('phoneModalTitle');
    modalTitle.innerText = modal.brand;

    const modalBody = document.getElementById('modal-body');
    modalBody.classList.add('modal-body');
    modalBody.innerHTML = `
    <div class="card p-4">
    <img src="${modal.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${modal.name}</h5>
      <p class="card-text">${modal.releaseDate}</p>
      <p class="card-text">Chip: ${modal.mainFeatures.chipSet}</p>
      <p class="card-text">Display: ${modal.mainFeatures.displaySize}</p>
      <p class="card-text">Memory: ${modal.mainFeatures.memory}</p>
      <p class="card-text">${modal.releaseDate ? modal.releaseDate: 'Released: No relese Date'}</p>
    </div>
  </div>
    `
}

loadPhoen('apple');