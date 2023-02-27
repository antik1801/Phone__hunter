const loadPhones = async (searchText,dataLimit=0) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const parent = document.getElementById('phone-container');
    parent.innerHTML=``;
    // No phones available 
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
    noPhone.classList.add('d-none');
    }
    // showAll buttons 
    const showAll = document.getElementById('show-all');
    if(phones.length > 10){
        // display 10 Phones 
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    // looping through array
    phones.forEach(element => {
        const child = document.createElement('div')
        child.classList.add('col');
        child.innerHTML = `
        <div class="card">
            <div class="px-5 py-2">
                <img src="${element.image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${element.slug
                }')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">show details</button>
            </div>
        </div>
        `;
        parent.appendChild(child);
    });

// stop loader / spinner 
toggleSpinner(false);
        
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field').value;
    loadPhones(searchField, dataLimit);
}

document.getElementById('btn-search').addEventListener('click',()=>{
    //start loader
   processSearch(10);
})
document.getElementById('search-field').addEventListener('keyup',(e)=>{
    // startLoader
    toggleSpinner(true);
    loadPhones(e.target.value);
})

const loadPhoneDetails =async (id)=>{
   const url = ` https://openapi.programming-hero.com/api/phone/${id}`
   const response = await fetch(url);
   const data = await response.json();
   showPhoneDetails(data.data);
}


// search input field enter key event handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// showing all the lists of the buttons
document.getElementById('show-all').addEventListener('click',()=>{
    processSearch();
})

const showPhoneDetails = phone =>{
    // console.log(phone);
    document.getElementById('phoneDetailModalLabel').innerText=`${phone.name}`
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p> ${phone.releaseDate ? phone.releaseDate : "Releasing soon"}</p>
    <p> ${phone.mainFeatures.chipSet} </p>
    <p> ${phone.mainFeatures.displaySize} </p>
    <p> ${phone.mainFeatures.memory} </p>
    <p> ${phone.mainFeatures.sensors} </p>
    <p> ${phone.mainFeatures.storage} </p>
    `
}



loadPhones('apple');
