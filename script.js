// Tabela dos produtos do estoque

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sTitulo = document.querySelector('#m-titulo')
const sTamanho = document.querySelector('#m-tamanho')
const sCor = document.querySelector('#m-cor')
const sPreco = document.querySelector('#m-preco')
const sQuantidade = document.querySelector('#m-quantidade')
const btnSalvar = document.querySelector('#btnSalvar')
const pecasDisponiveis = document.querySelector('#pecas-disponiveis')

let itens = [];
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sTitulo.value = itens[index].titulo
    sTamanho.value = itens[index].tamanho
    sCor.value = itens[index].cor
    sPreco.value = itens[index].preco
    sQuantidade.value = itens[index].quantidade
    pecasDisponiveis.textContent = itens[index].quantidade
    id = index
  } else {
    sTitulo.value = ''
    sTamanho.value = ''
    sCor.value = ''
    sPreco.value = ''
    sQuantidade.value = ''
    pecasDisponiveis.textContent = ''
    id = undefined;
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  if (confirm("Você deseja remover esse produto?")) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.titulo}</td>
    <td>${item.tamanho}</td>
    <td>${item.cor}</td>
    <td>${item.preco}</td>
    <td>${item.quantidade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  if (sTitulo.value === '' || sTamanho.value === '' || sCor.value === '' || sPreco.value === '' || sQuantidade.value === '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].titulo = sTitulo.value
    itens[id].tamanho = sTamanho.value
    itens[id].cor = sCor.value
    itens[id].preco = sPreco.value
    itens[id].quantidade = sQuantidade.value
  } else {
    itens.push({
      'titulo': sTitulo.value, 
      'tamanho': sTamanho.value, 
      'cor': sCor.value,
      'preco': sPreco.value, 
      'quantidade': sQuantidade.value
    })
  }

  setItensBD()
  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbsessao')) ?? []
const setItensBD = () => localStorage.setItem('dbsessao', JSON.stringify(itens))

loadItens()

function formatarMoeda(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = (valor / 100).toFixed(2);
  valor = valor.replace('.', ',');
  input.value = 'R$ ' + valor;
}




// Login

function logar(){

  var login = document.getElementById('login').value;
  var senha = document.getElementById('senha').value;

  if(login == "admin" && senha == "admin"){
      alert('Sucesso');
      location.href = "estoque.html";
  }else{
      alert('E-mail e/ou senha incorreto(s)');
  }

}