// get total
// create product
// save data in local storage
// clear inputs
// read
// count
// delete
// update
// search
// clean data
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const categeory = document.getElementById('category');
const submit = document.getElementById('submit');
let mood = 'create';
let tmp;

let dataPro;
function getTotal() {
  if (price.value !== '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.textContent = result;
    total.style.backgroundColor = 'green';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = 'red';
  }
}
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = () => {
  const newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    categeory: categeory.value.toLowerCase(),
  };
  if (title.value != '' && categeory.value != '' && price.value != '') {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      console.log(tmp);
      mood = 'create';
      count.style.display = 'block';
      submit.innerHTML = 'Create';
    }
    clearData();
  }

  localStorage.setItem('product', JSON.stringify(dataPro));

  showData();
};

function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  categeory.value = '';
  total.innerHTML = '';
}
function showData() {
  getTotal();
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    table += `

    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].categeory}</td>
    <td><button id="update"  onclick="update(${i})" >Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
  </tr>
    `;
  }
  let tBody = (document.getElementById('tbody').innerHTML = table);
  let deleteAll = document.getElementById('deleteAll');
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onClick = "deleteAll()"> DELETE ALL (${dataPro.length}) </button>`;
  }
}

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
function update(i) {
  console.log(i);
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;

  categeory.value = dataPro[i].categeory;
  count.style.display = 'none';
  submit.innerHTML = 'UPDATE ';
  getTotal();
  scroll({
    top: 0,
    behavior: 'smooth',
  });
  mood = 'update';
  tmp = i;
}
let searchMood = 'title';
function getSearchMood(id) {
  let search = document.getElementById('search');
  if (id === 'searchTitle') {
    searchMood = 'title';
    search.placeholder = 'Search By Title';
  } else {
    searchMood = 'category';
    search.placeholder = 'Search By Ctagory';
  }
  search.focus();
  search.value = '';
  showData();
}

function searchData(id) {
  let table = '';
  if (searchMood === 'title') {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(id.toLowerCase())) {
        table += `

    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].categeory}</td>
    <td><button id="update"  onclick="update(${i})" >Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
  </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].categeory.includes(id.toLowerCase())) {
        table += `

    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].categeory}</td>
    <td><button id="update"  onclick="update(${i})" >Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
  </tr>
    `;
      }
    }
  }
  let tBody = (document.getElementById('tbody').innerHTML = table);
}
showData();
