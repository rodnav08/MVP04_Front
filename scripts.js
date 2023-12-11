/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/youtubers';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.youtubers.forEach(item => insertList(item.name,
        item.subs,
        item.vidview,
        item.uploads,
        item.country,
        item.category,
        item.video_views_30,
        item.highest_earnings,
        item.outcome ? "Yes" : "No"
      ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()
/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputSubs, inputVidView,
  inputUploads, inputCountry, inputCategory,
  inputVideo_views_30, inputHigest_earnings) => {

  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('subs', inputSubs);
  formData.append('vidview', inputVidView);
  formData.append('uploads', inputUploads);
  formData.append('country', inputCountry);
  formData.append('category', inputCategory);
  formData.append('video_views_30', inputVideo_views_30);
  formData.append('highest_earnings', inputHigest_earnings);


  let url = 'http://127.0.0.1:5000/youtuber';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/youtuber?name=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = async () => {
  let inputName = document.getElementById("newName").value;
  let inputSubs = document.getElementById("newSubs").value;
  let inputVidView = document.getElementById("newVidView").value;
  let inputUploads = document.getElementById("newUploads").value;
  let inputCountry = document.getElementById("newCountry").value;
  let inputCategory = document.getElementById("newCategory").value;
  let inputVideo_views_30 = document.getElementById("newVideo_views_30").value;
  let inputHigest_earnings = document.getElementById("newHigest_earnings").value;


  // Verifique se o nome do produto já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/youtubers?name=${inputName}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (inputName === '' || inputCountry === '' || inputCategory === '') {
        alert("Esse(s) campo(s) não podem ser vazios!");
      } else if (isNaN(inputSubs) || isNaN(inputVidView) || isNaN(inputUploads) || isNaN(inputVideo_views_30) || isNaN(inputHigest_earnings)) {
        alert("Esse(s) campo(s) precisam ser números!");
      } else {
        insertList(inputName, inputSubs, inputVidView, inputUploads, inputCountry, inputCategory, inputVideo_views_30, inputHigest_earnings);
        postItem(inputName, inputSubs, inputVidView, inputUploads, inputCountry, inputCategory, inputVideo_views_30, inputHigest_earnings);
        alert("Item adicionado!");
        location.reload();

      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, subs, vidview, uploads, country, category, video_views_30, higest_earnings, outcome) => {
  var item = [name, subs, vidview, uploads, country, category, video_views_30, higest_earnings, outcome];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);


  document.getElementById("newName").value = "";
  document.getElementById("newSubs").value = "";
  document.getElementById("newVidView").value = "";
  document.getElementById("newUploads").value = "";
  document.getElementById("newCountry").value = "";
  document.getElementById("newCategory").value = "";
  document.getElementById("newVideo_views_30").value = "";
  document.getElementById("newHigest_earnings").value = "";


  removeElement();


}

const lista_country = ["Afghanistan", "Andorra", "Argentina", "Australia", "Bangladesh", "Barbados",
  "Brazil", "Canada", "Chile", "China", "Colombia", "Cuba", "Ecuador", "Egypt",
  "El Salvador", "Finland", "France", "Germany", "Global", "India", "Indonesia",
  "Iraq", "Italy", "Japan", "Jordan", "Kuwait", "Latvia", "Malaysia", "Mexico",
  "Morocco", "nan", "Netherlands", "Pakistan", "Peru", "Philippines", "Russia",
  "Samoa", "Saudi Arabia", "Singapore", "South Korea", "Spain", "Sweden",
  "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Venezuela", "Vietnam"]

const lista_category = ["Animals", "Autos", "Comedy", "Education", "Entertainment", "Film", "Games",
  "Howto", "Music", "News", "Nonprofit", "People", "Sports", "Tech"]

// Função para preencher as comboboxes
const fillCountryDropdowns = () => {
  const CountrySelect = document.getElementById("newCountry");


  lista_country.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;

    CountrySelect.appendChild(option.cloneNode(true));
  });
};
const fillCategoryDropdowns = () => {
  const CategorySelect = document.getElementById("newCategory");


  lista_category.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;

    CategorySelect.appendChild(option.cloneNode(true));
  });
};

// Chamada para preencher as comboboxes no carregamento da página
fillCountryDropdowns();
fillCategoryDropdowns();