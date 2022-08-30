const loadPhoen = async(search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone( data.data );
}

const displayPhone = phones => {
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
}

document.getElementById('search-btn').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhoen(searchText);
});

loadPhoen('iphone');