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
          <h5 class="card-title">${phone.brand}</h5>
          <p class="card-text">${phone.phone_name}</p>
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

loadPhoen('iphone');