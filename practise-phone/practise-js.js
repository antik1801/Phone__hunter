
const loadData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data);
}

const displayData = phones =>{
    console.log(phones);
    const parent = document.getElementById('phones-container');//step1
    const noPhone = document.getElementById('no-phone');
    parent.innerHTML = ``;
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100">
        <div class="px-5 py-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `
        parent.appendChild(div);
    });
}

document.getElementById('btn-search').addEventListener('click',()=>{
    const searchField = document.getElementById('search-input').value;
    loadData(searchField);
})

const toggleSpinner =(isLoading) =>{
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }
    else{
        loadingSpinner.classList.add('d-none');
    }
}

loadData();